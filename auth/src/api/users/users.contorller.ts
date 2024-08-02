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

  @Post('/all')
  async SaveUsers(@Body() body) {
    const users = body.users;
    try {
      for (const user of users) {
        if (!user.user_id) {
          throw new Error(`사용자 ID가 없습니다: ${JSON.stringify(user)}`);
        }

        // salary 값을 문자열에서 숫자로 변환
        const salary = parseFloat(user.salary);
        if (isNaN(salary)) {
          throw new Error(`유효하지 않은 급여 값: ${user.salary}`);
        }

        // 기존 사용자가 있는지 확인
        const existingUser = await this.queryBuilder
          .SELECT(['*'], 'relation_users_role')
          .WHERE('user_id = $1', user.user_id)
          .execution();

        if (existingUser.length > 0) {
          // 업데이트
          await this.queryBuilder
            .UPDATE(
              'relation_users_role',
              {
                role_name: user.role_name,
                salary: salary, // 수치로 변환
                field_name: user.field_name,
              },
              'user_id = $4',
              user.user_id,
            )
            .execution();
        } else {
          // 새로 추가
          await this.queryBuilder
            .INSERT('relation_users_role', {
              user_id: user.user_id,
              salary: salary, // 변환된 숫자 사용
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
