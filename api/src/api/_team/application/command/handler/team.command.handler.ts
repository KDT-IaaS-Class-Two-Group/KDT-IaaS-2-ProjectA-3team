import { Injectable } from '@nestjs/common';
import { TeamRepository } from 'src/api/_team/infrastructure/team.repository';
import { PostTeamCommand } from './post_team.command';

@Injectable()
export class PostTeamCommandHandler {
  constructor(private readonly repository: TeamRepository) {}

  async execute(command: PostTeamCommand) {
    const { team_name, description, team_members, team_leader } = command;
    const result = this.repository.checkTeamName(command.team_name);
    // 중복 검사
    if (result) {
      return false;
    }

    const saveTeamResult = this.repository.saveTeam({ team_name, description });
    // 팀원 추가
    if (saveTeamResult) {
      this.repository.InsertMemeber(team_name, {
        team_leader,
        team_members,
      });
    }
  }
}
