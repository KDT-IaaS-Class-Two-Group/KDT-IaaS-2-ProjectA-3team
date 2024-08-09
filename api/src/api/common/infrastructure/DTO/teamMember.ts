import { IsString, IsArray } from 'class-validator';
export class TeamMemberDTO {
  @IsString()
  team_leader: { [key: string]: string };

  @IsArray()
  team_members: { [key: string]: string }[];
}
