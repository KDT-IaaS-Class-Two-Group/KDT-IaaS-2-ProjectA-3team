import { Injectable } from '@nestjs/common';
import { TeamRepository } from 'src/api/common/infrastructure/Repository/team.repository';

@Injectable()
export class InsertTeam {
  constructor(private readonly teamRepository: TeamRepository) {}

  async saveTeamData(data) {
    console.log(data);
    const { team_name, description, team_leader, members } = data;

    const checkResult = !!(await this.teamRepository.checkTeamName(team_name));
    if (checkResult) {
      return false;
    }
    const saveTeamResult = await this.teamRepository.saveTeam({
      team_name,
      description,
    });
    if (saveTeamResult) {
      this.teamRepository.InsertMemeber(team_name, {
        team_leader: team_leader,
        team_members: members,
      });
    }
  }
}
