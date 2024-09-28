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
  // 클래스 멤버 변수로 역할 계층 정의 (const 대신 readonly 사용)
  private readonly roleHierarchy: { [key: string]: number } = {
    admin: 1,
    leader: 2,
    sub_admin: 3,
    employee: 4,
  };

  constructor(private readonly queryBuilder: QueryBuilder) {}

  // 역할 비교 함수도 클래스의 메서드로 변경
  private compareRoles(role1: string, role2: string): number {
    return (
      (this.roleHierarchy[role1] || 100) - (this.roleHierarchy[role2] || 100)
    );
  }

  @Get('/followingList')
  async getFollowingList(@Req() req: Request): Promise<any> {
    console.log('Session user:', req.session.user);
    const currentUserId = req.session.user?.user_id;
    if (!currentUserId) {
      console.error('No user ID found in session');
      throw new HttpException(
        'User not logged in or session expired',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const followingList = await this.queryBuilder
        .SELECT('users', ['users.user_id', 'users.username', 'role.role_name']) // 배열로 전달
        .JOIN('followers', 'users.user_id = followers.following_id') // followers 테이블과 조인
        .JOIN(
          `(SELECT user_id, role_name FROM admin_role_users
    UNION ALL
    SELECT user_id, role_name FROM leader_role_users
    UNION ALL
    SELECT user_id, role_name FROM sub_admin_role_users
    UNION ALL
    SELECT user_id, role_name FROM employee_role_users) as role`,
          'users.user_id = role.user_id', // role 테이블과 조인
        )
        .WHERE('followers.follower_id = $1', [currentUserId]) // 팔로우한 사용자 목록 조회
        .execution();
      console.log('Following list:', followingList);

      return followingList;
    } catch (error) {
      console.error('Error fetching following list:', error);
      throw new HttpException(
        'Failed to retrieve following list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 팔로우 요청 처리 시 역할 확인
  @Post('/follow')
  async followUser(
    @Req() req: Request,
    @Body() body: FollowUserDto,
  ): Promise<any> {
    const followerId = req.session?.user?.user_id; // 현재 로그인한 사용자
    const followerRole = req.session?.user?.role_name; // 현재 로그인한 사용자의 역할
    const { followingId } = body; // 팔로우할 사용자 ID

    if (!followerId) {
      throw new HttpException('User not logged in', HttpStatus.UNAUTHORIZED);
    }

    try {
      // 팔로우하려는 사용자가 admin_role_users에 있는지 확인 (관리자 여부 판단)
      // 팔로우하려는 사용자의 역할 확인
      const followingUser = await this.queryBuilder
        .SELECT('users', ['users.user_id', 'users.username', 'role.role_name'])
        .JOIN(
          // 모든 역할 테이블을 조인하여 역할 정보를 가져옴
          `(SELECT user_id, 'admin' AS role_name FROM admin_role_users
      UNION ALL
      SELECT user_id, 'leader' AS role_name FROM leader_role_users
      UNION ALL
      SELECT user_id, 'sub_admin' AS role_name FROM sub_admin_role_users
      UNION ALL
      SELECT user_id, 'employee' AS role_name FROM employee_role_users) as role`,
          'users.user_id = role.user_id', // users와 role을 조인
        )
        .WHERE('users.user_id = $1', [followingId]) // 팔로우할 사용자의 user_id 확인
        .execution();

      if (followingUser.length > 0) {
        const followingRole = followingUser[0].role_name;

        // 팔로우하려는 사용자가 더 높은 권한일 경우 팔로우 제한
        if (this.compareRoles(followerRole, followingRole) > 0) {
          throw new HttpException(
            'You cannot follow a user with a higher role',
            HttpStatus.FORBIDDEN,
          );
        }
      }

      // 이미 팔로우한 상태인지 확인
      const existingFollow = await this.queryBuilder
        .SELECT('followers', [
          'followers.follower_id',
          'followers.following_id',
          'role.role_name',
        ])
        .JOIN(
          `(SELECT user_id, role_name FROM admin_role_users
    UNION ALL
    SELECT user_id, role_name FROM leader_role_users
    UNION ALL
    SELECT user_id, role_name FROM sub_admin_role_users
    UNION ALL
    SELECT user_id, role_name FROM employee_role_users) as role`,
          'followers.following_id = role.user_id', // 'followers.following_id'와 'role.user_id'를 조인
        )
        .WHERE('followers.follower_id = $1 AND followers.following_id = $2', [
          followerId,
          followingId,
        ])
        .execution();

      if (existingFollow.length > 0) {
        const followingRole = existingFollow[0].role_name;

        // 현재 로그인한 사용자가 employee이고, 팔로우 대상이 admin일 경우 팔로우 제한
        if (followerRole === 'employee' && followingRole === 'admin') {
          throw new HttpException(
            'You cannot follow an admin as an employee',
            HttpStatus.FORBIDDEN,
          );
        }

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

  @Post('/unfollow')
  async unfollowUser(
    @Req() req: Request,
    @Body() body: FollowUserDto,
  ): Promise<any> {
    const followerId = req.session?.user?.user_id;
    const { followingId } = body;

    if (!followerId) {
      throw new HttpException('User not logged in', HttpStatus.UNAUTHORIZED);
    }

    try {
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
}
