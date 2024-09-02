import {
  Controller,
  Post,
  Req,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { Request } from 'express';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { FollowUserDto } from './dto/follow_user.dto';

@Controller('/user/follow')
export class UserFollowController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  @Post('/')
  async followUser(
    @Req() req: Request,
    @Body() body: FollowUserDto,
  ): Promise<any> {
    const followerId = req.session.user?.user_id; // 현재 로그인한 사용자의 ID
    const { followingId } = body;

    if (!followerId) {
      throw new HttpException('User not logged in', HttpStatus.UNAUTHORIZED);
    }

    // 팔로우 관계 삽입
    await this.queryBuilder
      .INSERT('followers', {
        follower_id: followerId,
        following_id: followingId,
      })
      .execution();

    return { message: 'Followed successfully' };
  }

  @Post('/unfollow')
  async unfollowUser(
    @Req() req: Request,
    @Body() body: FollowUserDto,
  ): Promise<any> {
    const followerId = req.session.user?.user_id;
    const { followingId } = body;

    if (!followerId) {
      throw new HttpException('User not logged in', HttpStatus.UNAUTHORIZED);
    }

    // 팔로우 관계 삭제
    await this.queryBuilder
      .DELETE('followers', 'follower_id = $1 AND following_id = $2', [
        followerId,
        followingId,
      ])
      .execution();

    return { message: 'Unfollowed successfully' };
  }

  @Get('/list')
  async getFollowingList(@Req() req: Request): Promise<any> {
    const currentUserId = req.session.user?.user_id;

    if (!currentUserId) {
      throw new HttpException(
        'User not logged in or session expired',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 팔로우한 사용자 목록을 가져옵니다.
    const followingList = await this.queryBuilder
      .SELECT('users', ['user_id', 'username', 'email'])
      .JOIN('followers', 'users.user_id = followers.following_id')
      .WHERE('followers.follower_id = $1', [currentUserId])
      .execution();

    return followingList;
  }
}
