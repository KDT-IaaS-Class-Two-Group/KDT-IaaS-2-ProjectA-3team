import { Injectable } from '@nestjs/common';
import { TeamRepository } from 'src/api/_team/infrastructure/team.repository';
import { PostTeamCommand } from './post_team.command';

@Injectable()
export class PostTeamCommandHandler {
  constructor(private readonly repository: TeamRepository) {}

  async execute(command: PostTeamCommand) {
    const { team_name, description, team_members, team_leader } = command;

    // 중복 검사
    const result = await this.repository.checkTeamName(team_name); // await 추가
    if (result) {
      console.log(`Team with name ${team_name} already exists.`);
      return false;
    }

    // 팀 저장
    console.log('Saving team with description:', description);
    const saveTeamResult = await this.repository.saveTeam({
      team_name,
      description,
    }); // await 추가

    // 팀원 추가
    if (saveTeamResult) {
      console.log('Inserting team members:', team_members);
      await this.repository.InsertMember(team_name, {
        team_leader,
        team_members,
      }); // await 추가
    }

    return true;
  }
}
