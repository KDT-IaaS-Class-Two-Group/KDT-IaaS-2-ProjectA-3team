import { ProjectName } from 'src/api/issue/domain/value-object/project_name.vo';
import { ProjectStartDate } from '../value-object/project_start_date.vo';
import { ProjectEndDate } from '../value-object/project_end_date.vo';
import { TeamName } from '../value-object/team_name.vo';

/**
 * * Class : Project
 * 작성자 : @naviadev / 2024-08-30
 * 편집자 : @naviadev / 2024-08-30
 * @class Project
 * @param : 프로젝트 이름, 생성일, 마감일, 팀 이름
 * @description : 생성자의 private 선언을 통해 외부에서의 직접적인 접근을 방지함. 이것으로 내부의 객체 생성 로직을 꺼내보지 않아도 create메서드의 파라미터로 객체만 추가한다면 Project 도메인 클래스 객체로 변환시킬 수 있음.
 */
export class Project {
  private project_name: ProjectName;
  private project_start_date: ProjectStartDate;
  private project_end_date: ProjectEndDate;
  private team_name: TeamName;

  private constructor(
    project_name: ProjectName,
    project_start_date: ProjectStartDate,
    project_end_date: ProjectEndDate,
    team_name: TeamName,
  ) {
    this.project_name = project_name;
    this.project_start_date = project_start_date;
    this.project_end_date = project_end_date;
    this.team_name = team_name;
  }

  // ? private 로 감싸진 멤버 변수들을 접근할 수 있도록 get 메서드 작성.
  getProjectName() {
    return this.project_name;
  }

  getProjectStartDate() {
    return this.project_start_date;
  }

  getProjectEndDate() {
    return this.project_end_date;
  }

  getProjectTeamName() {
    return this.team_name;
  }
  // Factory Method : VO 객체의 분리로 매개변수 검증 로직을 도메인 클래스에서 제외.
  static create(obj: {
    project_name: string;
    project_start_date: Date;
    project_end_date: Date;
    team_name: string;
  }): Project {
    //프로젝트 이름 검증
    try {
      const validatedProjectName = new ProjectName(obj.project_name);
      //프로젝트 시작일 검증
      const validatedStartDate = new ProjectStartDate(obj.project_start_date);
      //프로젝트 마감일 검증
      const validatedEndDate = new ProjectEndDate(obj.project_end_date);
      //프로젝트 할당 팀 이름 검증
      const validatedTeamName = new TeamName(obj.team_name);

      // 주어진 값들을 VO 객체로 변환함으로써 도메인은 검증된 값들만 사용할 수 있게 됨.
      return new Project(
        validatedProjectName,
        validatedStartDate,
        validatedEndDate,
        validatedTeamName,
      );
    } catch (error) {
      console.error(error);
    }
  }
}
