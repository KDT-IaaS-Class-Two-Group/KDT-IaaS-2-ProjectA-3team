import { Injectable } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { CreateTeamDto } from './create-team.dto';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}

  async createTeam(createTeamDto: CreateTeamDto) {
    // 팀 저장
    await this.teamRepository.saveTeam({
      team_name: createTeamDto.team_name,
      description: createTeamDto.description,
    });

    // 팀장 및 팀원 추가
    return await this.teamRepository.addMembers(
      createTeamDto.team_name,
      createTeamDto.teamLeader,
      createTeamDto.teamMembers,
    );
  }
}
