import { Controller, Get, Post, Body } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';

@Controller('/getUser')
/**
 * * Class : UsersController
 * 작성자 : @naviadev / 2024-08-02
 * 편집자 : @naviadev / 2024-08-02
 * Issue :
 * @class UsersController
 * @param private readonly queryBuilder: QueryBuilder
 * @description  : PIPE 를 통해 세션 검사 모듈 추가
 */
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

  @Get('/fields') // 추가된 API 엔드포인트
  async GetFields() {
    const fields = await this.queryBuilder
      .SELECT('field', ['field_name'])
      .execution();
    return fields;
  }

  @Post('/all')
  async SaveUsers(@Body() body) {
    const users = body.users;
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

        if (existingUser.length > 0) {
          await this.queryBuilder
            .UPDATE(
              'relation_users_role',
              {
                role_name: user.role_name,
                salary: salary,
                field_name: user.field_name,
              },
              'user_id = $4',
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
}

@Controller('/team')
/**
 * * Class : TeamController
 * 작성자 : @dalarmjwi / 2024-08-01
 * 편집자 : @naviadev / 2024-08-02
 * Issue :
 * @class TeamController
 * @param private readonly queryBuilder: QueryBuilder
 * @description
 *
 * CHECKLIST
 * [ ] 1. 팀 데이터베이스 레코드 생성.
 * [ ] 2. 관계 테이블 레코드 생성. (for ?)
 * [ ] 3. 결과값 반환
 */
export class TeamController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  @Post('/create')
  async createTeam(
    @Body()
    body: {
      teamName: string;
      leader: any;
      members: any[];
      description: string;
    },
  ) {
    try {
      // 팀장과 팀원 정보를 사용하여 팀을 데이터베이스에 삽입
      await this.queryBuilder
        .INSERT('team', {
          team_name: body.teamName,
          team_leader_id: body.leader?.user_id,
          team_member_ids: body.members
            .map((member) => member.user_id)
            .join(','),
          description: body.description,
        })
        .execution();

      return { message: '팀이 성공적으로 생성되었습니다!' };
    } catch (error) {
      console.error('Failed to create team:', error);
      throw new Error('Failed to create team');
    }
  }
}
