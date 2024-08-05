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

  @Get('/userpersonal')
  async UserPersonal() {
    const obj = await this.queryBuilder.SELECT(['*'], 'users').execution();
    return obj;
  }

  @Get('/userprofile')
  async UserProfile() {
    const obj = await this.queryBuilder.SELECT(['*'], 'Profile').execution();
    return obj;
  }

  @Get('/fields')
  async GetFields() {
    const fields = await this.queryBuilder
      .SELECT(['field_name'], 'field')
      .execution();
    return fields;
  }

  @Post('/saveProfile')
  async SaveProfile(@Body() body) {
    const { user_id, bio } = body;

    try {
      // 데이터 타입을 명시적으로 지정
      const existingProfile = await this.queryBuilder
        .SELECT(['*'], 'Profile')
        .WHERE('user_id = $1::VARCHAR', user_id) // 데이터 타입 명시
        .execution();

      if (existingProfile.length > 0) {
        // 데이터 타입을 명시적으로 지정
        await this.queryBuilder
          .UPDATE(
            'Profile',
            { bio },
            'user_id = $1::VARCHAR', // 데이터 타입 명시
            user_id,
          )
          .execution();
      } else {
        await this.queryBuilder.INSERT('Profile', { user_id, bio }).execution();
      }
      return { message: '프로필 정보 저장 완료' };
    } catch (error) {
      console.error('프로필 정보 저장 실패:', error);
      return { error: '프로필 정보 저장 실패' };
    }
  }
}
