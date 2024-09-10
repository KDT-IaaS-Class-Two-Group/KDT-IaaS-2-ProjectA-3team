import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { InsertUserDto } from './dto/user_controller.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { AcceptChangesDto } from './dto/user_change.dto';
import { RejectChangesDto } from './dto/user_reject.dto';

@Controller('/user')
export class UserManagementController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  @Post('/insert')
  async insertUser(@Body() data: InsertUserDto): Promise<any> {
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
      return { message: 'User added successfully.' };
    } catch (error) {
      console.error('Error adding user:', error);
      throw new HttpException(
        'Failed to add user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('/checkTeamName')
  async checkTeamName(@Body() body: { team_name: string }) {
    const { team_name } = body; // 여기서 team_name을 문자열로 받음
    try {
      const existingTeam = await this.queryBuilder
        .SELECT('Team', 'team_name')
        .WHERE('team_name = $1', [team_name]) // team_name을 배열로 감싸서 전달
        .execution();

      return { exists: existingTeam.length > 0 };
    } catch (error) {
      console.error('팀 이름 중복 체크 실패:', error);
      throw new Error('팀 이름 중복 체크 실패');
    }
  }

  @Post('/saveTeam')
  async saveTeam(@Body() body: any) {
    const { team_name, description, teamLeader, teamMembers } = body;

    try {
      // 팀 이름이 이미 존재하는지 확인
      const teamExists = await this.queryBuilder
        .SELECT('Team', 'team_name')
        .WHERE('team_name = $1', team_name)
        .execution();

      if (teamExists.length > 0) {
        // 팀 이름이 이미 존재하는 경우
        return { error: '팀 이름이 이미 존재합니다.' };
      }

      // 팀 정보 저장
      await this.queryBuilder
        .INSERT('Team', {
          team_name,
          description,
        })
        .execution();

      // 팀장 저장
      if (teamLeader) {
        await this.queryBuilder
          .INSERT('relation_team_users', {
            team_name,
            user_id: teamLeader.user_id,
            role_name: 'leader',
          })
          .execution();
      }

      // 팀원 저장
      for (const member of teamMembers) {
        await this.queryBuilder
          .INSERT('relation_team_users', {
            team_name,
            user_id: member.user_id,
            role_name: 'employee',
          })
          .execution();
      }

      return { message: '팀 정보와 구성원이 성공적으로 저장되었습니다.' };
    } catch (error) {
      console.error('팀 정보 저장 실패:', error);
      return { error: '팀 정보 저장 실패' };
    }
  }
  @Post('/update')
  async updateUser(@Body() data: UpdateUserDto): Promise<any> {
    const { user_id, ...fields } = data;
    if (!user_id) {
      throw new HttpException('User ID is required.', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.queryBuilder
        .UPDATE('checkusers', fields, 'user_id = $1')
        .execution();
      return { message: 'User information updated successfully.' };
    } catch (error) {
      console.error('Error updating user information:', error);
      throw new HttpException(
        'Failed to update user information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/accept')
  async acceptChanges(@Body() body: AcceptChangesDto): Promise<any> {
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
  async rejectChanges(@Body() body: RejectChangesDto): Promise<any> {
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

  // 모든 사용자 데이터를 조회하는 엔드포인트 추가
  @Get('/all')
  async getAllUsers(): Promise<any> {
    try {
      const users = await this.queryBuilder
        .SELECT('users', [
          'user_id',
          'username',
          'birth_date',
          'address',
          'phone',
          'email',
        ])
        .execution();

      return users; // 조회된 사용자 데이터를 반환
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new HttpException(
        'Failed to fetch user data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  // 직원 데이터를 조회하는 엔드포인트 추가
  @Get('/members')
  async CheckMembers(): Promise<any> {
    try {
      const members = await this.queryBuilder
        .SELECT('employee_role_users', ['user_id'])
        .execution();
      return members;
    } catch (error) {
      console.error('Error fetching members:', error);
      throw new HttpException(
        'Failed to fetch members',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 리더 데이터를 조회하는 엔드포인트 추가
  @Get('/leaders')
  async CheckLeaders(): Promise<any> {
    try {
      const leaders = await this.queryBuilder
        .SELECT('leader_role_users', ['user_id'])
        .execution();
      return leaders;
    } catch (error) {
      console.error('Error fetching leaders:', error);
      throw new HttpException(
        'Failed to fetch leaders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
