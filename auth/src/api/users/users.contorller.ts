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

  @Get('/all')
  async CheckUser(@Body() data) {
    console.log(data);
    const obj = this.queryBuilder.SELECT(['*'], 'users').execution();
    return obj;
  }

  @Get('pending')
  async CheckPendingUser() {
    const obj = this.queryBuilder.SELECT(['*'], 'pending_users').execution();
    return obj;
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
