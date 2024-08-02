import { Controller, Get, Post, Body } from '@nestjs/common';

import { QueryBuilder } from 'src/database/queryBuilder';
@Controller('/getUser')
export class UsersController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  @Get('/all')
  async CheckUser() {
    const obj = this.queryBuilder.SELECT(['*'], 'users').execution();
    // -> SELECT * FROM users; 가 된다. 쿼리문 조합기
    return obj;
  }
}
@Controller('/team')
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
