import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { SaveProfileDto } from './dto/profile.dto';

@Controller('/profile')
export class UserProfileController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  @Get('/userpersonal')
  async UserPersonal(@Req() req: Request): Promise<any> {
    const userId = req.session.user?.user_id;

    if (userId) {
      try {
        const obj = await this.queryBuilder
          .SELECT('users', [
            'user_id',
            'username',
            'birth_date',
            'address',
            'phone',
            'email',
          ])
          .WHERE('user_id = $1', [userId])
          .execution();
        return obj;
      } catch (error) {
        console.error('Server error occurred:', error);
        throw new HttpException(
          'Server error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('No session ID found', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('/checkprofile')
  async getCheckProfile(): Promise<any> {
    try {
      const checkUsers = await this.queryBuilder
        .SELECT('checkusers')
        .execution();
      return checkUsers;
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      throw new HttpException(
        'Failed to fetch user profiles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/saveProfile')
  async SaveProfile(@Body() body: SaveProfileDto): Promise<any> {
    const { user_id, bio } = body;

    try {
      const existingProfile = await this.queryBuilder
        .SELECT('Profile')
        .WHERE('user_id = $1::VARCHAR', [user_id])
        .execution();

      if (existingProfile.length > 0) {
        await this.queryBuilder
          .UPDATE('Profile', { bio: bio }, 'user_id = $1')
          .execution();
      } else {
        await this.queryBuilder
          .INSERT('Profile', { user_id: user_id, bio: bio })
          .execution();
      }
      return { message: 'Profile saved successfully.' };
    } catch (error) {
      console.error('Failed to save profile:', error);
      throw new HttpException(
        'Failed to save profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
