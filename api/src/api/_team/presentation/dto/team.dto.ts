import { IsString } from 'class-validator';

export class TeamDTO {
  @IsString()
  team_name: string;

  @IsString()
  description: string;

  @IsString()
  team_leader: { [key: string]: string };

  @IsString()
  team_members: { [key: string]: string }[];
}
