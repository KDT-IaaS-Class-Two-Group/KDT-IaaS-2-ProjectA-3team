import { Injectable } from '@nestjs/common';
import { TeamRepository } from 'src/api/common/infrastructure/Repository/team.repository';

@Injectable()
export class InsertTeam {
  constructor(private readonly teamRepository: TeamRepository) {}

  async saveTeamData(data) {
    console.log('Received data:', data); // 데이터 확인용 로그
    const { team_name, description, teamLeader, teamMembers } = data;

    // 팀 이름 중복 체크
    const checkResult = !!(await this.teamRepository.checkTeamName(team_name));
    if (checkResult) {
      console.log('Team name already exists.');
      return false;
    }

    // 팀 저장
    const saveTeamResult = await this.teamRepository.saveTeam({
      team_name,
      description,
    });

    // 팀이 정상적으로 저장되었으면 팀 멤버 저장
    if (saveTeamResult) {
      console.log('Saving team members...');
      await this.teamRepository.InsertMemeber(team_name, {
        team_leader: teamLeader,
        team_members: teamMembers,
      });
    }
  }
}
