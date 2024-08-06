// src/users/users.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { QueryBuilder } from 'src/database/queryBuilder'; // 실제 경로로 수정 필요

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
    if (!Array.isArray(users)) {
      throw new BadRequestException('잘못된 데이터 형식');
    }

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

        if (Array.isArray(existingUser) && existingUser.length > 0) {
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
  async saveProfile(@Body() body: any) {
    const { user_id, bio } = body;

    if (!user_id || !bio) {
      return { message: '사용자 ID와 바이오가 필요합니다.' };
    }

    try {
      const existingProfile = await this.queryBuilder
        .SELECT('Profile')
        .WHERE('user_id = $1::VARCHAR', user_id)
        .execution();

      if (Array.isArray(existingProfile) && existingProfile.length > 0) {
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

  @Post('/updateuser')
  async updateUser(@Body() data: any) {
    const { user_id, ...fields } = data;

    if (!user_id) {
      return { message: '사용자 ID가 필요합니다.' };
    }

    try {
      await this.queryBuilder
        .UPDATE('checkusers', fields, 'user_id = $1', user_id)
        .execution();
      console.log('사용자 정보 업데이트 완료');
      return { message: '사용자 정보가 업데이트되었습니다.' };
    } catch (error) {
      console.error('사용자 정보 업데이트 오류:', error);
      return { message: '사용자 정보 업데이트 실패' };
    }
  }

  @Post('/insertuser')
  async insertUser(@Body() data: any) {
    const { username, birth_date, address, phone, email, password, user_id } =
      data;

    if (!user_id || !username || !password) {
      return { message: '사용자 ID, 이름, 비밀번호는 필수 항목입니다.' };
    }

    try {
      await this.queryBuilder
        .INSERT('checkusers', {
          username,
          birth_date,
          address,
          phone,
          email,
          password,
          user_id,
        })
        .execution();
      console.log('사용자 추가 완료');
      return { message: '사용자가 추가되었습니다.' };
    } catch (error) {
      console.error('사용자 추가 오류:', error);
      return { message: '사용자 추가 실패' };
    }
  }

  @Get('/checkprofile')
  async getCheckProfile() {
    try {
      // checkusers 테이블에서 모든 사용자 정보 조회
      const checkUsers = await this.queryBuilder
        .SELECT('checkusers')
        .execution();

      return checkUsers;
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error);
      return { message: '사용자 정보 조회 실패' };
    }
  }

  @Post('/accept')
  async acceptChanges(@Body() body: any) {
    const { user_id } = body;

    if (!user_id) {
      return { message: '사용자 ID가 필요합니다.' };
    }

    try {
      // checkusers 테이블에서 사용자 정보 조회
      const checkUser = await this.queryBuilder
        .SELECT('checkusers')
        .WHERE('user_id = $1', user_id)
        .execution();

      if (checkUser.length === 0) {
        return { message: '변경 요청이 없습니다.' };
      }

      // users 테이블의 데이터 업데이트
      await this.queryBuilder
        .UPDATE(
          'users',
          {
            username: checkUser[0].username,
            birth_date: checkUser[0].birth_date,
            address: checkUser[0].address,
            phone: checkUser[0].phone,
            email: checkUser[0].email,
            password: checkUser[0].password,
          },
          'user_id = $1',
          user_id,
        )
        .execution();

      // checkusers 테이블에서 사용자 정보 삭제
      await this.queryBuilder
        .DELETE('checkusers', 'user_id = $1', user_id)
        .execution();

      return { message: '사용자 정보가 업데이트되었습니다.' };
    } catch (error) {
      console.error('사용자 정보 업데이트 오류:', error);
      return { message: '사용자 정보 업데이트 실패' };
    }
  }

  @Delete('/reject')
  async rejectChanges(@Body() body: any) {
    const { user_id } = body;

    if (!user_id) {
      return { message: '사용자 ID가 필요합니다.' };
    }

    try {
      // checkusers 테이블에서 사용자 정보 삭제
      await this.queryBuilder
        .DELETE('checkusers', 'user_id = $1', user_id)
        .execution();

      return { message: '변경 요청이 거절되었습니다.' };
    } catch (error) {
      console.error('변경 요청 거절 오류:', error);
      return { message: '변경 요청 거절 실패' };
    }
  }
}
