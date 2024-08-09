import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';
import { TeamDTO } from '../DTO/team';
import { TeamMemberDTO } from '../DTO/teamMember';
import { TABLE_NAME } from '../../enum/table/table.enum';
import { QUERY_PLACEHOLDER } from '../../enum/query/query.enum';
import { ROLE_COLUMNS } from '../../data/RoleColumns.enum';
import { SUCCESS_MESSAGE } from '../../enum/message/successMessage';

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

  async saveTeam(teamData: TeamDTO) {
    try {
      await this.qb.INSERT('team', teamData).execution();
      return true;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async InsertMemeber(team_name: string, teamMemeber: TeamMemberDTO) {
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

    // 팀원 저장
    for (const member of team_members) {
      await this.qb
        .INSERT(TABLE_NAME.__RELATION_TEAM_USERS, {
          team_name,
          user_id: member.user_id,
          role_name: ROLE_COLUMNS.__LEVEL_1,
        })
        .execution();
    }
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
