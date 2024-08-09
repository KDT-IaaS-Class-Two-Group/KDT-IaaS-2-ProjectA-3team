import { IsString } from 'class-validator';
export class TeamDTO {
  @IsString()
  team_name: string;

  @IsString()
  description: string;
}
