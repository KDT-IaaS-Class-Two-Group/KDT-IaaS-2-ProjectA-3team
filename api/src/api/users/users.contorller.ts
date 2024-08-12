import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Delete,
  HttpException,
  HttpStatus,
  Query, // Query 파라미터 사용을 위해 추가
} from '@nestjs/common';
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

  private role_users = ['user_id'];
  @Get('/attendance/random')
  async getRandomAttendanceRecords(): Promise<any> {
    const records = await this.queryBuilder
      .SELECT('work_table', [
        'work_table.user_id',
        'users.username',
        'work_table.startTime AS clockInTime',
        'work_table.endTime AS clockOutTime',
      ])
      .JOIN('users', 'work_table.user_id = users.user_id') // users 테이블과 JOIN
      .ORDER_BY('RANDOM()')
      .LIMIT(3)
      .execution();
    return records;
  }

  @Get('/all')
  async CheckUser(@Body() data: any, @Req() req: Request): Promise<any> {
    const currentUserId = req.session.user?.user_id;
    console.log(data);

    const users = await this.queryBuilder
      .SELECT('users', this.nonePasswordObject)
      .execution();

    // 각 사용자에 대해 팔로우 상태 확인
    const userIds = users.map((user) => user.user_id);
    const followingList = await this.queryBuilder
      .SELECT('followers', ['following_id'])
      .WHERE('follower_id = $1 AND following_id = ANY($2)', [
        currentUserId,
        userIds,
      ])
      .execution();

    const followingIds = new Set(followingList.map((f) => f.following_id));

    // 팔로우 상태 추가
    const result = users.map((user) => ({
      ...user,
      isFollowing: followingIds.has(user.user_id),
    }));

    return result;
  }
  @Get('/search')
  async searchUsers(
    @Query('query') query: string,
    @Req() req: Request,
  ): Promise<any> {
    const currentUserId = req.session.user?.user_id; // 현재 로그인한 사용자 ID

    if (!query) {
      throw new HttpException(
        'Query string is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 데이터베이스에서 사용자를 검색
    const users = await this.queryBuilder
      .SELECT('users', ['user_id', 'username', 'email'])
      .WHERE('username ILIKE $1 OR user_id ILIKE $1', [`%${query}%`])
      .execution();

    // 현재 사용자가 팔로우하고 있는지 여부 확인
    const userIds = users.map((user) => user.user_id);
    const followingList = await this.queryBuilder
      .SELECT('followers', ['following_id'])
      .WHERE('follower_id = $1 AND following_id = ANY($2)', [
        currentUserId,
        userIds,
      ])
      .execution();

    const followingIds = new Set(followingList.map((f) => f.following_id));

    // 각 사용자 객체에 팔로우 상태를 추가하여 반환
    const result = users.map((user) => ({
      ...user,
      isFollowing: followingIds.has(user.user_id),
    }));

    return result;
  }

  // @Get('/search')
  // async searchUsers(
  //   @Query('query') query: string,
  //   @Req() req: Request,
  // ): Promise<any> {
  //   const currentUserId = req.session.user?.user_id;
  //   console.log(`Current User ID: ${currentUserId}`);
  //   if (!query) {
  //     throw new HttpException(
  //       'Query string is required',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   const users = await this.queryBuilder
  //     .SELECT('users', ['user_id', 'username', 'email'])
  //     .WHERE('username ILIKE $1 OR user_id ILIKE $1', [`%${query}%`])
  //     .execution();

  //   // 각 사용자에 대해 팔로우 상태 확인
  //   const userIds = users.map((user) => user.user_id);
  //   const followingList = await this.queryBuilder
  //     .SELECT('followers', ['following_id'])
  //     .WHERE('follower_id = $1 AND following_id = ANY($2)', [
  //       currentUserId,
  //       userIds,
  //     ])
  //     .execution();

  //   const followingIds = new Set(followingList.map((f) => f.following_id));

  //   // 팔로우 상태 추가
  //   const result = users.map((user) => ({
  //     ...user,
  //     isFollowing: followingIds.has(user.user_id),
  //   }));

  //   return result;
  // }
  @Get('/followingList')
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
  @Post('/follow')
  async followUser(
    @Req() req: Request,
    @Body() body: { followingId: string },
  ): Promise<any> {
    const followerId = req.session.user?.user_id; // 현재 로그인한 사용자의 ID
    const { followingId } = body;

    // 현재 로그인한 사용자가 유효한지 확인
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
    @Body() body: { followingId: string },
  ): Promise<any> {
    const followerId = req.session.user?.user_id; // 현재 로그인한 사용자의 ID
    const { followingId } = body;

    if (!followerId) {
      throw new HttpException('User not logged in', HttpStatus.UNAUTHORIZED);
    }

    // 팔로우 관계 삭제
    await this.queryBuilder
      .DELETE('followers', 'follower_id = $1 AND following_id = $2', [
        followerId, // $1에 해당하는 값
        followingId, // $2에 해당하는 값
      ])
      .execution();

    return { message: 'Unfollowed successfully' };
  }

  @Get('/leaders')
  async CheckLeaders(): Promise<any> {
    const obj = await this.queryBuilder
      .SELECT('leader_role_users', this.role_users)
      .execution();
    return obj;
  }

  @Get('/role')
  async getUserRole(@Req() req: Request): Promise<any> {
    const userId = req.session.user?.user_id;

    if (!userId) {
      throw new HttpException(
        'User not logged in or session expired',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const roleTables = [
      'admin_role_users',
      'leader_role_users',
      'sub_admin_role_users',
      'employee_role_users',
    ];

    const role = await this.findUserRole(userId, roleTables);
    if (role) {
      return { role };
    }

    throw new HttpException('Role not found for user', HttpStatus.NOT_FOUND);
  }

  private async findUserRole(
    userId: string,
    roleTables: string[],
  ): Promise<string | null> {
    for (const table of roleTables) {
      const roleQuery = await this.queryBuilder
        .SELECT(table, ['role_name'])
        .WHERE('user_id = $1', [userId])
        .execution();

      if (roleQuery.length > 0) {
        return roleQuery[0].role_name;
      }
    }
    return null;
  }

  @Get('/members')
  async CheckMembers(): Promise<any> {
    const obj = await this.queryBuilder
      .SELECT('employee_role_users', this.role_users)
      .execution();
    return obj;
  }

  @Get('/pending')
  async CheckPendingUser(): Promise<any> {
    const obj = await this.queryBuilder
      .SELECT('pending_users', this.nonePasswordObject)
      .execution();
    return obj;
  }

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

  @Get('/userprofile')
  async UserProfile(): Promise<any> {
    const obj = await this.queryBuilder.SELECT('Profile').execution();
    return obj;
  }

  @Get('/fields')
  async GetFields(): Promise<any> {
    const fields = await this.queryBuilder
      .SELECT('field', 'field_name')
      .execution();
    return fields;
  }

  @Get('/checkusers/count')
  async getCheckUsersCount(): Promise<any> {
    try {
      const countResult = await this.queryBuilder
        .SELECT('checkusers', ['COUNT(*)'])
        .execution();

      const count = countResult[0].count;
      return { count: parseInt(count, 10) };
    } catch (error) {
      console.error('Error fetching user count:', error);
      throw new HttpException(
        'Failed to fetch user count',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/all')
  async SaveUsers(@Body() body: any): Promise<any> {
    const users = body.users;
    try {
      const roles = ['admin', 'leader', 'sub_admin', 'employee'];
      for (const role of roles) {
        const existingRole = await this.queryBuilder
          .SELECT('role')
          .WHERE('role_name = $1', [role])
          .execution();
        if (existingRole.length === 0) {
          await this.queryBuilder
            .INSERT('role', { role_name: role })
            .execution();
        }
      }

      for (const user of users) {
        if (!user.user_id) {
          throw new HttpException(
            `User ID is missing: ${JSON.stringify(user)}`,
            HttpStatus.BAD_REQUEST,
          );
        }

        const salary = parseInt(user.salary, 10);
        if (isNaN(salary)) {
          throw new HttpException(
            `Invalid salary value: ${user.salary}`,
            HttpStatus.BAD_REQUEST,
          );
        }
        console.log(`Updating user_id: ${user.user_id} with salary: ${salary}`);
        const existingUser = await this.queryBuilder
          .SELECT('users_salary')
          .WHERE('user_id = $1', [user.user_id])
          .execution();

        if (existingUser.length > 0) {
          await this.queryBuilder
            .UPDATE('users_salary', { salary: salary }, 'user_id = $1', [
              user.user_id,
            ])
            .execution();
        } else {
          await this.queryBuilder
            .INSERT('users_salary', {
              user_id: user.user_id,
              salary: salary,
            })
            .execution();
        }

        if (user.field_name) {
          const existingField = await this.queryBuilder
            .SELECT('relation_users_field_name')
            .WHERE('user_id = $1 AND field_name = $2', [
              user.user_id,
              user.field_name,
            ])
            .execution();

          if (existingField.length === 0) {
            await this.queryBuilder
              .INSERT('relation_users_field_name', {
                user_id: user.user_id,
                field_name: user.field_name,
              })
              .execution();
          }
        }

        const roleName = roles.includes(user.role_name)
          ? user.role_name
          : 'employee';
        let roleTable = '';

        switch (roleName) {
          case 'admin':
            roleTable = 'admin_role_users';
            break;
          case 'leader':
            roleTable = 'leader_role_users';
            break;
          case 'sub_admin':
            roleTable = 'sub_admin_role_users';
            break;
          case 'employee':
          default:
            roleTable = 'employee_role_users';
            break;
        }

        const existingRole = await this.queryBuilder
          .SELECT(roleTable)
          .WHERE('user_id = $1', [user.user_id])
          .execution();

        if (existingRole.length === 0) {
          await this.queryBuilder
            .INSERT(roleTable, {
              user_id: user.user_id,
              role_name: roleName,
            })
            .execution();
        }
      }
      return { message: 'User information saved successfully' };
    } catch (error) {
      console.error('Failed to save user information:', error);
      throw new HttpException(
        'Failed to save user information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/clockin')
  async clockIn(@Body() body: { userId: string }): Promise<any> {
    const { userId } = body;
    const now = new Date();

    // userId가 유효한지 확인
    if (!userId) {
      console.error('userId is missing or undefined.');
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }

    try {
      console.log('ClockIn started for userId:', userId);

      const result = await this.queryBuilder
        .INSERT('work_table', {
          user_id: userId,
          startTime: now,
        })
        .execution();

      console.log('Insert result:', result);

      return { message: 'Clock-in successful.', result };
    } catch (error) {
      console.error('Clock-in error:', error);
      throw new HttpException(
        'Clock-in failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/clockout')
  async clockOut(@Body() body: { userId: string }): Promise<any> {
    const { userId } = body;

    try {
      console.log('ClockOut started for userId:', userId);

      const result = await this.queryBuilder
        .UPDATE(
          'work_table',
          { endTime: new Date() }, // endTime 필드를 TIMESTAMP로 저장
          'user_id = $2 AND endTime IS NULL',
          [userId], // 조건 파라미터로 userId 전달
        )
        .execution();

      console.log('Update result:', result);

      if (result.length === 0) {
        return { message: 'No clock-in record found or already clocked out.' };
      }

      return { message: 'Clock-out successful.', result };
    } catch (error) {
      console.error('Clock-out error:', error);
      throw new HttpException(
        'Clock-out failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/saveTeam')
  async saveTeam(@Body() body: any): Promise<any> {
    const { team_name, description, teamLeader, teamMembers } = body;

    try {
      const teamExists = await this.queryBuilder
        .SELECT('Team', 'team_name')
        .WHERE('team_name = $1', [team_name])
        .execution();

      if (teamExists.length > 0) {
        return { error: 'Team name already exists.' };
      }

      await this.queryBuilder
        .INSERT('Team', {
          team_name,
          description,
        })
        .execution();

      if (teamLeader) {
        await this.queryBuilder
          .INSERT('relation_team_users', {
            team_name,
            user_id: teamLeader.user_id,
            role_name: 'leader',
          })
          .execution();
      }

      for (const member of teamMembers) {
        await this.queryBuilder
          .INSERT('relation_team_users', {
            team_name,
            user_id: member.user_id,
            role_name: 'employee',
          })
          .execution();
      }

      return { message: 'Team and members saved successfully.' };
    } catch (error) {
      console.error('Failed to save team:', error);
      throw new HttpException(
        'Failed to save team',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/saveProfile')
  async SaveProfile(@Body() body: any): Promise<any> {
    const { user_id, bio } = body;

    try {
      const existingProfile = await this.queryBuilder
        .SELECT('Profile')
        .WHERE('user_id = $1::VARCHAR', [user_id])
        .execution();

      if (existingProfile.length > 0) {
        await this.queryBuilder
          .UPDATE('Profile', { bio: bio }, 'user_id = $1', [user_id])
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

  @Post('/updateuser')
  async updateUser(@Body() data: any): Promise<any> {
    const { user_id, ...fields } = data;
    if (!user_id) {
      throw new HttpException('User ID is required.', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.queryBuilder
        .UPDATE('checkusers', fields, 'user_id = $1', [user_id])
        .execution();
      console.log('User information updated successfully');
      return { message: 'User information updated successfully.' };
    } catch (error) {
      console.error('Error updating user information:', error);
      throw new HttpException(
        'Failed to update user information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/insertuser')
  async insertUser(@Body() data: any): Promise<any> {
    const { username, birth_date, address, phone, email, password, user_id } =
      data;
    if (!user_id || !username || !password) {
      throw new HttpException(
        'User ID, username, and password are required.',
        HttpStatus.BAD_REQUEST,
      );
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
      console.log('User added successfully');
      return { message: 'User added successfully.' };
    } catch (error) {
      console.error('Error adding user:', error);
      throw new HttpException(
        'Failed to add user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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

  @Post('/accept')
  async acceptChanges(@Body() body: any): Promise<any> {
    const { user_id } = body;
    if (!user_id) {
      throw new HttpException('User ID is required.', HttpStatus.BAD_REQUEST);
    }
    try {
      const checkUser = await this.queryBuilder
        .SELECT('checkusers')
        .WHERE('user_id = $1', [user_id])
        .execution();

      if (checkUser.length === 0) {
        return { message: 'No changes to accept.' };
      }

      await this.queryBuilder
        .UPDATE(
          'users',
          {
            user_id: checkUser[0].user_id,
            username: checkUser[0].username,
            birth_date: checkUser[0].birth_date,
            address: checkUser[0].address,
            phone: checkUser[0].phone,
            email: checkUser[0].email,
            password: checkUser[0].password,
          },
          'user_id = $1',
          [checkUser[0].user_id],
        )
        .execution();

      await this.queryBuilder
        .DELETE('checkusers', 'user_id = $1', [user_id])
        .execution();

      return { message: 'User information updated successfully.' };
    } catch (error) {
      console.error('Error accepting changes:', error);
      throw new HttpException(
        'Failed to accept changes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/reject')
  async rejectChanges(@Body() body: any): Promise<any> {
    const { user_id } = body;
    if (!user_id) {
      throw new HttpException('User ID is required.', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.queryBuilder
        .DELETE('checkusers', 'user_id = $1', [user_id])
        .execution();
      return { message: 'Change request rejected successfully.' };
    } catch (error) {
      console.error('Error rejecting change request:', error);
      throw new HttpException(
        'Failed to reject change request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
