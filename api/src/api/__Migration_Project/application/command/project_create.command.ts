import { ProjectDTO } from 'src/api/project/DTO/project.DTO';

/**
 * * Class : CreateProjectCommand
 * 작성자 : @naviadev / 2024-08-08
 * 편집자 : @naviadev / 2024-08-30
 * @class CreateProjectCommand
 * @description : 프로젝트 생성을 위한 명령 객체
 */
export class CreateProjectCommand {
  readonly project_name: string;
  readonly project_start_date: Date;
  readonly project_end_date: Date;
  readonly team_name: string;

  private constructor(
    project_name: string,
    project_start_date: Date,
    project_end_date: Date,
    team_name: string,
  ) {
    this.project_name = project_name;
    this.project_start_date = project_start_date;
    this.project_end_date = project_end_date;
    this.team_name = team_name;
  }

  static DtoToCreateProjectCommand(object: ProjectDTO) {
    return new CreateProjectCommand(
      object.project_name,
      object.project_start_date,
      object.project_end_date,
      object.team_name,
    );
  }
}
