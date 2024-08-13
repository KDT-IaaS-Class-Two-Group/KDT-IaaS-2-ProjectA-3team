import { IssueName } from '../Value-Object/issue_name.vo';
import { UserId } from '../Value-Object/user_id.vo';
import { ProjectName } from '../Value-Object/project_name.vo';
import { Status } from '../Value-Object/status.vo';

/**
 * * Class : Issue
 * 작성자 : @naviadev / 2024-08-13
 * 편집자 : @naviadev / 2024-08-13
 * Issue :
 * @class Issue
 * @param issue_id: number
 * @param issue_name: IssueName
 * @param status: Status
 * @param project_name: ProjectName
 * @param user_id: UserId
 * @description : 이슈를 나타내는 엔티티. Issue에 대한 속성을 정의하고 유효성 검사를 진행한다.
 */
export class Issue {
  private issue_id: number;
  private issue_name: IssueName;
  private status: Status;
  private project_name: ProjectName;
  private user_id: UserId | null;

  constructor(
    issue_id: number,
    issue_name: IssueName,
    status: Status,
    project_name: ProjectName,
    user_id: UserId | null,
  ) {
    this.issue_id = issue_id;
    this.issue_name = issue_name;
    this.status = status;
    this.project_name = project_name;
    this.user_id = user_id;
  }

  static create(
    issue_id: number | null,
    issue_name: string,
    status: string,
    project_name: string,
    user_id: string | null,
  ) {
    if (user_id === null) {
      return new Issue(
        issue_id,
        new IssueName(issue_name),
        new Status(status),
        new ProjectName(project_name),
        null,
      );
    }
    return new Issue(
      issue_id,
      new IssueName(issue_name),
      new Status(status),
      new ProjectName(project_name),
      new UserId(user_id),
    );
  }
  getIssueId() {
    return this.issue_id;
  }

  getIssueName() {
    return this.issue_name.value;
  }

  getStatus() {
    return this.status.value;
  }

  getProjectName() {
    return this.project_name.value;
  }

  getUserId() {
    if (this.user_id !== null) {
      return this.user_id.value;
    }
  }
}
