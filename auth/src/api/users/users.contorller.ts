import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { QueryBuilder } from 'src/database/queryBuilder';

@Controller('/getUser')
export class UsersController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  private nonePasswordObject = [
    'user_id',
    'username',
    'birth_date',
    'address',
    'phone',
    'email',
  ];
  @Get('/all')
  async CheckUser(@Body() data) {
    console.log(data);
    const obj = this.queryBuilder
      .SELECT('users', this.nonePasswordObject)
      .execution();
    return obj;
  }
  @Get('/leaders')
  async CheckLeaders() {
    const obj = this.queryBuilder
      .SELECT('leader_role_users', ['user_id', 'role_name'])
      .execution();
    return obj;
  }

  @Get('/members')
  async CheckMembers() {
    const obj = this.queryBuilder
      .SELECT('employee_role_users', ['user_id', 'role_name'])
      .execution();
    return obj;
  }
  @Get('pending')
  async CheckPendingUser() {
    const obj = this.queryBuilder
      .SELECT('pending_users', this.nonePasswordObject)
      .execution();
    return obj;
  }
  @Get('/userpersonal')
  async UserPersonal(@Req() req: Request) {
    const se = req.session.user?.user_id;
    console.log(se);
    if (se) {
      try {
        const obj = await this.queryBuilder
          .SELECT('users', [
            'user_id',
            'username',
            'birth_date',
            'address',
            'phone',
            'email',
            'password',
          ])
          .WHERE('user_id = $1', se) // 조건과 값을 올바르게 설정
          .execution();
        return obj;
      } catch (error) {
        console.error('서버에서 오류 발생:', error);
        throw new Error('서버에서 오류 발생');
      }
    } else {
      return { message: '세션 아이디가 없습니다.' };
    }
  }

  @Get('/userprofile')
  async UserProfile() {
    const obj = await this.queryBuilder
      .SELECT('Profile') // 모든 컬럼을 선택
      .execution();
    return obj;
  }

  @Get('/fields')
  async GetFields() {
    const fields = await this.queryBuilder
      .SELECT('field', 'field_name') // 필요한 컬럼만 선택
      .execution();
    return fields;
  }

  @Post('/all')
  async SaveUsers(@Body() body: any) {
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
          .SELECT('relation_users_role')
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
              'user_id = $1',
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

  @Post('/saveProfile')
  async SaveProfile(@Body() body: any) {
    const { user_id, bio } = body;

    try {
      const existingProfile = await this.queryBuilder
        .SELECT('Profile')
        .WHERE('user_id = $1::VARCHAR', user_id)
        .execution();

      if (existingProfile.length > 0) {
        await this.queryBuilder
          .UPDATE('Profile', { bio: bio }, 'user_id = $1', user_id)
          .execution();
      } else {
        await this.queryBuilder
          .INSERT('Profile', { user_id: user_id, bio: bio })
          .execution();
      }
      return { message: '프로필 정보 저장 완료' };
    } catch (error) {
      console.error('프로필 정보 저장 실패:', error);
      return { error: '프로필 정보 저장 실패' };
    }
  }
}
