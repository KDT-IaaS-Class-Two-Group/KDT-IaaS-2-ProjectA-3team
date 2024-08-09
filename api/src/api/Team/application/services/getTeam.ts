import { Injectable } from '@nestjs/common';
import { SERVICE_ERROR } from 'src/api/common/enum/message/error/serviceErrorMessage';
import { TeamDTO } from 'src/api/common/infrastructure/DTO/team';
import { TeamRepository } from 'src/api/common/infrastructure/Repository/team.repository';

@Injectable()
export class GetTeamHandler {
  constructor(private readonly teamRepository: TeamRepository) {}

  async getAllTeams(): Promise<TeamDTO[]> {
    try {
      return await this.teamRepository.getAllTeams();
    } catch (error) {
      throw new Error(`${SERVICE_ERROR.__FETCHING_TEAM_FAILURE}${error}`);
    }
  }

  async checkTeamExists(team_name: string): Promise<boolean> {
    try {
      const teamData: TeamDTO =
        await this.teamRepository.checkTeamName(team_name);
      return !!teamData;
    } catch (error) {
      throw new Error(`${SERVICE_ERROR.__CHECK_TEAM_ERROR}${error}`);
    }
  }

  async getTeamMembers(team_name: string): Promise<any[]> {
    try {
      const checkData = this.checkTeamExists(team_name);
      if (!checkData) {
        throw new Error(SERVICE_ERROR.__FETCHING_TEAM_MEMBER);
      }
      return await this.teamRepository.getMemberData(team_name);
    } catch (error) {
      throw new Error(`${SERVICE_ERROR.__FETCHING_TEAM_MEMBER}${error}`);
    }
  }
}
