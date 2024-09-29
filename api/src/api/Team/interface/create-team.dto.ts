export class CreateTeamDto {
  team_name: string;
  description: string;
  teamLeader: string | null;
  teamMembers: string[];
}
