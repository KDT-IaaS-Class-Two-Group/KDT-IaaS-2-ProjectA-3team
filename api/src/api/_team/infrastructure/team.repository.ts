import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { TeamDTO } from '../presentation/dto/team.dto';
import { TeamMemberDTO } from 'src/api/common/infrastructure/DTO/teamMember';
import { TABLE_NAME } from 'src/api/common/enum/table/table.enum';
import { QUERY_PLACEHOLDER } from 'src/api/common/enum/query/query.enum';
import { ROLE_COLUMNS } from 'src/api/common/data/RoleColumns.enum';
import { SUCCESS_MESSAGE } from 'src/api/common/enum/message/successMessage';

@Injectable()
export class TeamRepository {
  constructor(private readonly qb: QueryBuilder) {}

  async checkTeamName(team_name: string) {
    const existingTeam = await this.qb
      .SELECT(TABLE_NAME.__TEAM)
      .WHERE(QUERY_PLACEHOLDER.__TEAM_NAME, [team_name])
      .execution();
    return existingTeam[0];
  }

  async saveTeam(teamData: { team_name: string; description: string }) {
    try {
      await this.qb.INSERT('team', teamData).execution();
      return true;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async InsertMember(team_name: string, teamMemeber: TeamMemberDTO) {
    console.log(team_name);
    const { team_leader, team_members } = teamMemeber;

    // 팀장 저장
    if (team_leader) {
      await this.qb
        .INSERT(TABLE_NAME.__RELATION_TEAM_USERS, {
          team_name,
          user_id: team_leader.user_id,
          role_name: ROLE_COLUMNS.__LEVEL_2,
        })
        .execution();
    }

    // team_members 유효성 검사
    if (!team_members || !Array.isArray(team_members)) {
      console.error('팀 멤버가 정의되지 않았거나 배열이 아닙니다.');
      return { message: '팀 멤버를 추가할 수 없습니다.' }; // 적절한 오류 메시지 반환
    }

    // 각 팀 멤버 추가
    await Promise.all(
      team_members.map(async (memberObject) => {
        await this.qb
          .INSERT(TABLE_NAME.__RELATION_TEAM_USERS, {
            team_name,
            user_id: memberObject.user_id,
            role_name: ROLE_COLUMNS.__LEVEL_1,
          })
          .execution();
      }),
    );

    return { message: SUCCESS_MESSAGE.__CREATE_TEAM };
  }

  async getAllTeams(): Promise<TeamDTO[]> {
    return this.qb.SELECT(TABLE_NAME.__TEAM).execution();
  }

  async getMemberData(teamName: string): Promise<TeamMemberDTO[]> {
    return this.qb
      .SELECT(TABLE_NAME.__RELATION_TEAM_USERS)
      .WHERE(QUERY_PLACEHOLDER.__TEAM_NAME, [teamName])
      .execution();
  }
}
