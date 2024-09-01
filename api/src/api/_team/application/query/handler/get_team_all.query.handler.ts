import { Injectable } from '@nestjs/common';
import { TeamRepository } from 'src/api/_team/infrastructure/team.repository';
import { SERVICE_ERROR } from 'src/api/common/enum/message/error/serviceErrorMessage';

@Injectable()
export class GetTeamAllQueryHandler {
  constructor(private readonly repository: TeamRepository) {}
  async execute() {
    try {
      return await this.repository.getAllTeams();
    } catch (error) {
      throw new Error(`${SERVICE_ERROR.__FETCHING_TEAM_FAILURE} ${error}`);
    }
  }
}
