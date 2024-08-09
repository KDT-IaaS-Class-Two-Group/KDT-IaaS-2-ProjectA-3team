// import { Injectable } from '@nestjs/common';
// import { TeamDTO } from 'src/api/common/infrastructure/DTO/team';
// import { TeamRepository } from 'src/api/common/infrastructure/Repository/team.repository';

// @Injectable()
// export class GetTeam {
//   constructor(private readonly teamRepository: TeamRepository) {}

//   async getAll() {
//     try {
//       const teamData: TeamDTO[] = await this.teamRepository.getAllTeams();
//       return teamData;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async checkTeam(team_name: string) {
//     const teamData: TeamDTO =
//       await this.teamRepository.checkTeamName(team_name);
//     // 빈 값이면 중복이 아니기 때문에 값이 존재한다면 -> return false
//     if (teamData) {
//       return false;
//     }
//   }
//   async getTeamMember(team_name: string) {
//     const teamMembers = await this.teamRepository.getMemberData(team_name);
//     return teamMembers;
//   }
// }
