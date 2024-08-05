import { Controller, Get, Post, Body } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';

@Controller('/getUser')
export class UsersController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  @Get('/all')
  async CheckUser() {
    const obj = await this.queryBuilder
      .SELECT(['*'], 'pending_users')
      .execution();
    return obj;
  }

  @Get('/fields') // 추가된 API 엔드포인트
  async GetFields() {
    const fields = await this.queryBuilder
      .SELECT(['field_name'], 'field')
      .execution();
    return fields;
  }

  @Post('/all')
  async SaveUsers(@Body() body) {
    const users = body.users;
    try {
      for (const user of users) {
        if (!user.user_id) {
          throw new Error(`사용자 ID가 없습니다: ${JSON.stringify(user)}`);
        }

        const salary = parseFloat(user.salary);
        if (isNaN(salary)) {
          throw new Error(`유효하지 않은 급여 값: ${user.salary}`);
        }

        const existingUser = await this.queryBuilder
          .SELECT(['*'], 'relation_users_role')
          .WHERE('user_id = $1', user.user_id)
          .execution();

        if (existingUser.length > 0) {
          await this.queryBuilder
            .UPDATE(
              'relation_users_role',
              {
                role_name: user.role_name,
                salary: salary,
                field_name: user.field_name,
              },
              'user_id = $4',
              user.user_id,
            )
            .execution();
        } else {
          await this.queryBuilder
            .INSERT('relation_users_role', {
              user_id: user.user_id,
              salary: salary,
              role_name: user.role_name,
              field_name: user.field_name,
            })
            .execution();
        }
      }
      return { message: '사용자 정보 저장 완료' };
    } catch (error) {
      console.error('사용자 정보 저장 실패:', error);
      return { error: '사용자 정보 저장 실패' };
    }
  }
}
