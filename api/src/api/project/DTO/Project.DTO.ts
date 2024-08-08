import { IsDate, IsNotEmpty, IsString } from 'class-validator';

/**
 * * Class : ProjectDTO
 * 작성자 : @naviadev / 2024-08-08
 * 편집자 : @naviadev / 2024-08-08
 * Issue :
 * @class ProjectDTO
 * @description : Project 데이터를 송수신하기 위한 DTO
 */
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
