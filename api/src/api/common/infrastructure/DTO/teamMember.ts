import { IsString, IsArray } from 'class-validator';
export class TeamMemberDTO {
  @IsString()
  team_leader: string;

  @IsArray()
  team_members: string[];
}
