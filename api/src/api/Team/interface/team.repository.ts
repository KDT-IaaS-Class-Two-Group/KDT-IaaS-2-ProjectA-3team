import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamRepository {
  // 팀 저장
  async saveTeam(teamData: { team_name: string; description: string }) {
    // 여기에 실제 데이터베이스 쿼리를 추가하여 팀 저장 로직을 처리하세요.
    console.log('팀 저장:', teamData);
    // 예시: INSERT INTO "team" (team_name, description) VALUES ($1, $2)
  }

  // 팀장 및 팀원 추가
  async addMembers(
    teamName: string,
    teamLeader: string | null,
    teamMembers: string[],
  ) {
    if (teamLeader) {
      console.log(`팀장 추가: 팀 ${teamName}, 리더 ${teamLeader}`);
      // 팀장을 데이터베이스에 추가하는 로직을 여기에 작성하세요.
      // 예시: INSERT INTO "team_members" (team_name, user_id, role) VALUES ($1, $2, 'leader')
    }

    for (const member of teamMembers) {
      console.log(`팀 멤버 추가: 팀 ${teamName}, 멤버 ${member}`);
      // 팀원을 데이터베이스에 추가하는 로직을 여기에 작성하세요.
      // 예시: INSERT INTO "team_members" (team_name, user_id, role) VALUES ($1, $2, 'member')
    }

    return { message: '팀이 생성되었습니다.' };
  }
}
