import { Controller, Get, Post, Body, Req, Delete } from '@nestjs/common';
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

  @Get('/all')
  async CheckUser(@Body() data) {
    console.log(data);
    const obj = this.queryBuilder
      .SELECT('users', this.nonePasswordObject)
      .execution();
    return obj;
  }

  private async getUserRoleForUser(userId: string) {
    const roleTables = [
      'admin_role_users',
      'leader_role_users',
      'sub_admin_role_users',
      'employee_role_users',
    ];

    for (const table of roleTables) {
      const roleQuery = await this.queryBuilder
        .SELECT(table, ['role_name'])
        .WHERE('user_id = $1', [userId])
        .execution();

      if (roleQuery.length > 0) {
        return roleQuery[0].role_name;
      }
    }

    return 'employee'; // Default role if none found
  }

  @Get('/leaders')
  async CheckLeaders() {
    const obj = this.queryBuilder
      .SELECT('leader_role_users', this.role_users)
      .execution();
    return obj;
  }
  @Get('/role')
  async getUserRole(@Req() req: Request) {
    const userId = req.session.user?.user_id;

    if (!userId) {
      throw new Error('User not logged in or session expired');
    }

    const roleTables = [
      'admin_role_users',
      'leader_role_users',
      'sub_admin_role_users',
      'employee_role_users',
    ];

    for (const table of roleTables) {
      const roleQuery = await this.queryBuilder
        .SELECT(table, ['role_name'])
        .WHERE('user_id = $1', [userId])
        .execution();

      if (roleQuery.length > 0) {
        return { role: roleQuery[0].role_name };
      }
    }

    throw new Error('Role not found for user');
  }

  @Get('/members')
  async CheckMembers() {
    const obj = this.queryBuilder
      .SELECT('employee_role_users', this.role_users)
      .execution();
    return obj;
  }

  @Get('/pending')
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
          .WHERE('user_id = $1', [se]) // 'se'를 매개 변수로 전달
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
    const obj = await this.queryBuilder.SELECT('Profile').execution();
    return obj;
  }

  @Get('/fields')
  async GetFields() {
    const fields = await this.queryBuilder
      .SELECT('field', 'field_name')
      .execution();
    return fields;
  }
  @Get('/checkusers/count')
  async getCheckUsersCount() {
    try {
      // checkusers 테이블에서 전체 데이터 개수를 조회
      const countResult = await this.queryBuilder
        .SELECT('checkusers', ['COUNT(*)']) // 테이블 이름과 컬럼을 함께 지정
        .execution();

      const count = countResult[0].count; // 조회된 개수 가져오기
      return { count: parseInt(count, 10) };
    } catch (error) {
      console.error('사용자 정보 개수 조회 오류:', error);
      return { message: '사용자 정보 개수 조회 실패' };
    }
  }

  @Post('/all')
  async SaveUsers(@Body() body: any) {
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
          throw new Error(`사용자 ID가 없습니다: ${JSON.stringify(user)}`);
        }

        const salary = parseInt(user.salary, 10);
        if (isNaN(salary)) {
          throw new Error(`유효하지 않은 급여 값: ${user.salary}`);
        }
        console.log(`Updating user_id: ${user.user_id} with salary: ${salary}`);
        const existingUser = await this.queryBuilder
          .SELECT('users_salary')
          .WHERE('user_id = $1', user.user_id)
          .execution();

        if (existingUser.length > 0) {
          await this.queryBuilder
            .UPDATE('users_salary', { salary: salary }, 'user_id = $1')
            .execution();
        } else {
          // 새로운 사용자인 경우 추가
          await this.queryBuilder
            .INSERT('users_salary', {
              user_id: user.user_id,
              salary: salary,
            })
            .execution();
        }
        // 분야 정보 저장
        if (user.field_name) {
          const existingField = await this.queryBuilder
            .SELECT('relation_users_field_name')
            .WHERE('user_id = $1 AND field_name = $2', [
              user.user_id,
              user.field_name,
            ])
            .execution();

          if (existingField.length === 0) {
            // 새로운 분야 정보 추가
            await this.queryBuilder
              .INSERT('relation_users_field_name', {
                user_id: user.user_id,
                field_name: user.field_name,
              })
              .execution();
          }
        }
        // 권한 정보 저장
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
          .WHERE('user_id = $1', user.user_id)
          .execution();

        if (existingRole.length === 0) {
          // 새로운 역할 정보 추가
          await this.queryBuilder
            .INSERT(roleTable, {
              user_id: user.user_id,
              role_name: roleName,
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
  @Post('/checkTeamName')
  async checkTeamName(@Body() body: { team_name: string }) {
    const { team_name } = body;
    try {
      const existingTeam = await this.queryBuilder
        .SELECT('Team', 'team_name')
        .WHERE('team_name = $1', [team_name])
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
          .UPDATE('Profile', { bio: bio }, 'user_id = $1')
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
        .UPDATE('checkusers', fields, 'user_id = $1')
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
      const checkUser = await this.queryBuilder
        .SELECT('checkusers')
        .WHERE('user_id = $1', [user_id])
        .execution();

      if (checkUser.length === 0) {
        return { message: '변경 요청이 없습니다.' };
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
          'user_id = $8',
        )
        .ADD_PARAM(checkUser[0].user_id) // 추가된 메서드를 통해 매개변수 추가
        .execution();

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
      await this.queryBuilder
        .DELETE('checkusers', 'user_id = $1', user_id)
        .execution();
      return { message: '변경 요청이 거부되었습니다.' };
    } catch (error) {
      console.error('변경 요청 거부 오류:', error);
      return { message: '변경 요청 거부 실패' };
    }
  }
}
