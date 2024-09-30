import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  HttpException,
  HttpStatus,
  Req,
  Param,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { InsertUserDto } from './dto/user_controller.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { AcceptChangesDto } from './dto/user_change.dto';
import { RejectChangesDto } from './dto/user_reject.dto';
import { TodoService } from 'src/database/infrastructure/Todo.Service';
@Controller('/user')
export class UserManagementController {
  constructor(
    private readonly queryBuilder: QueryBuilder,
    private readonly todoService: TodoService, // todoService 주입
  ) {}
  private nonePasswordObject = [
    'user_id',
    'username',
    'birth_date',
    'address',
    'phone',
    'email',
  ];
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
        .WHERE('team_name = $1', [team_name])
        .execution();

      if (teamExists.length > 0) {
        return { error: '팀 이름이 이미 존재합니다.' };
      }

      // 팀 정보 저장
      await this.queryBuilder
        .INSERT('team', {
          team_name,
          description,
        })
        .execution();

      // 팀장 저장
      console.log('팀장 데이터:', teamLeader); // teamLeader가 객체인지 확인
      if (typeof teamLeader === 'string') {
        console.log(
          'teamLeader는 문자열입니다. user_id 필드를 찾을 수 없습니다.',
        );
      } else if (teamLeader && teamLeader.user_id) {
        console.log('teamLeader 객체 확인:', teamLeader); // teamLeader가 객체인 경우
      } else {
        console.log('teamLeader가 null이거나 잘못된 형식입니다.');
      }

      if (!teamLeader || !teamLeader.user_id) {
        return { error: '팀장의 user_id가 없습니다.' };
      }

      await this.queryBuilder
        .INSERT('relation_team_users', {
          team_name,
          user_id: teamLeader.user_id,
          role_name: 'leader',
        })
        .execution();

      // 팀원 저장
      for (const member of teamMembers) {
        console.log('팀원 user_id:', member.user_id); // 팀원의 user_id 콘솔 출력
        if (!member.user_id) {
          return { error: `팀원의 user_id가 없습니다: ${member}` };
        }
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
  @Get('/roles') // 모든 역할을 가져오는 새로운 API
  async getAllRoles(): Promise<any> {
    console.log('Fetching all roles from role table');
    try {
      const rolesQuery = await this.queryBuilder
        .SELECT('role', ['role_name'])
        .execution();

      if (rolesQuery.length > 0) {
        console.log('Roles found:', rolesQuery);
        return rolesQuery;
      } else {
        console.log('No roles found in role table');
        throw new HttpException('No roles found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw new HttpException(
        'Internal Server Error',
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
  @Get('/pending')
  async CheckPendingUser(): Promise<any> {
    const obj = await this.queryBuilder
      .SELECT('pending_users', this.nonePasswordObject)
      .execution();
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
  @Get('/attendance/random')
  async getRandomAttendanceRecords(): Promise<any> {
    try {
      const records = await this.queryBuilder
        .SELECT('work_table', [
          'work_table.user_id',
          'users.username',
          '"work_table"."startTime" AS "clockInTime"', // 쌍따옴표 추가
          '"work_table"."endTime" AS "clockOutTime"', // 쌍따옴표 추가
        ])
        .JOIN('users', 'work_table.user_id = users.user_id') // JOIN
        .ORDER_BY('RANDOM()')
        .LIMIT(3)
        .execution();
      return records;
    } catch (error) {
      console.error('Error fetching attendance records:', error); // 에러 로그 추가
      throw new HttpException(
        'Failed to fetch attendance records',
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
  @Get('/:issue_id/todos')
  async getTodos(@Param('issue_id') issue_id: string): Promise<any> {
    try {
      const todos = await this.queryBuilder
        .SELECT('todos', ['todo_id', 'description', 'iscomplete']) // 칼럼 이름 소문자로 변경
        .WHERE('issue_id = $1', [issue_id])
        .execution();

      if (todos.length === 0) {
        throw new HttpException(
          'No ToDos found for this issue',
          HttpStatus.NOT_FOUND,
        );
      }

      return todos;
    } catch (error) {
      console.error('Error fetching ToDo list:', error);
      throw new HttpException(
        'Failed to fetch ToDos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 2. 특정 이슈에 할 일 추가
  @Post('/:issue_id/todos')
  async addTodo(
    @Param('issue_id') issue_id: string,
    @Body('description') description: string,
  ): Promise<any> {
    if (!description) {
      throw new HttpException(
        'Description is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.queryBuilder
        .INSERT('todos', {
          issue_id,
          description,
          iscomplete: false,
        })
        .execution();

      return { message: 'ToDo added successfully' };
    } catch (error) {
      console.error('Error adding ToDo:', error);
      throw new HttpException(
        'Failed to add ToDo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 3. 할 일을 완료 처리
  @Patch('/todos/:todo_id/complete')
  async completeTodoTask(@Param('todo_id') todo_id: string): Promise<any> {
    console.log(`Completing ToDo with ID: ${todo_id}`);
    // todo_id를 사용해서 데이터를 업데이트 또는 처리
    const updatedTodo = await this.todoService.completeTodo(todo_id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Todo completed successfully',
      data: updatedTodo,
    };
  }

  // 4. 할 일 삭제
  @Delete('/todos/:todo_id')
  async deleteTodoTask(@Param('todo_id') todo_id: string): Promise<any> {
    try {
      const result = await this.queryBuilder
        .DELETE('todos', 'todo_id = $1', [todo_id])
        .execution();

      if (result.length === 0) {
        throw new HttpException(
          'ToDo not found or already deleted',
          HttpStatus.NOT_FOUND,
        );
      }

      return { message: 'ToDo deleted successfully' };
    } catch (error) {
      console.error('Error deleting ToDo:', error);
      throw new HttpException(
        'Failed to delete ToDo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
