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
  @Get('/followingList')
  async getFollowingList(@Req() req: Request): Promise<any> {
    console.log('Session user:', req.session.user);
    const currentUserId = req.session.user?.user_id;
    if (!currentUserId) {
      console.error('No user ID found in session'); // 로그 추가
      throw new HttpException(
        'User not logged in or session expired',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      // 팔로우한 사용자 목록을 가져옵니다.
      const followingList = await this.queryBuilder
        .SELECT('users', ['user_id', 'username', 'email'])
        .JOIN('followers', 'users.user_id = followers.following_id')
        .WHERE('followers.follower_id = $1', [currentUserId])
        .execution(); // 쿼리 결과를 로그로 출력
      console.log('Following list:', followingList);

      return followingList;
    } catch (error) {
      // 쿼리 실행 중 발생한 오류를 캡처하고 로그로 출력
      console.error('Error fetching following list:', error);
      throw new HttpException(
        'Failed to retrieve following list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 팔로우 요청
  @Post('/')
  async followUser(
    @Req() req: Request,
    @Body() body: FollowUserDto,
  ): Promise<any> {
    const followerId = req.session?.user?.user_id; // 현재 로그인한 사용자의 ID
    const { followingId } = body;

    if (!followerId) {
      throw new HttpException('User not logged in', HttpStatus.UNAUTHORIZED);
    }

    try {
      // 이미 팔로우한지 확인
      const existingFollow = await this.queryBuilder
        .SELECT('followers', ['follower_id', 'following_id'])
        .WHERE('follower_id = $1 AND following_id = $2', [
          followerId,
          followingId,
        ])
        .execution();

      if (existingFollow.length > 0) {
        return { message: 'Already following this user' };
      }

      // 팔로우 관계 삽입
      await this.queryBuilder
        .INSERT('followers', {
          follower_id: followerId,
          following_id: followingId,
        })
        .execution();

      return { message: 'Followed successfully' };
    } catch (error) {
      console.error('Error during follow:', error);
      throw new HttpException(
        'Failed to follow the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // // 언팔로우 요청
  @Post('/unfollow')
  async unfollowUser(
    @Req() req: Request,
    @Body() body: FollowUserDto,
  ): Promise<any> {
    const followerId = req.session?.user?.user_id; // 현재 로그인한 사용자의 ID
    const { followingId } = body;

    if (!followerId) {
      throw new HttpException('User not logged in', HttpStatus.UNAUTHORIZED);
    }

    try {
      // 팔로우 관계 삭제
      await this.queryBuilder
        .DELETE('followers', 'follower_id = $1 AND following_id = $2', [
          followerId,
          followingId,
        ])
        .execution();

      return { message: 'Unfollowed successfully' };
    } catch (error) {
      console.error('Error during unfollow:', error);
      throw new HttpException(
        'Failed to unfollow the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 팔로잉 목록 가져오기
}
