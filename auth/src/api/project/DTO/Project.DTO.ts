import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ProjectDTO {
  @IsString()
  @IsNotEmpty()
  readonly project_name: string;

  @IsDate()
  @IsNotEmpty()
  readonly project_start_date: Date;

  @IsDate()
  @IsNotEmpty()
  readonly project_end_date: Date;
}
