export enum IssueStatus {
  PENDING = '대기',
  COMPLETED = '완료',
}

/**
 * * Class : Status
 * 작성자 : @naviadev / 2024-08-13
 * 편집자 : @naviadev / 2024-08-13
 * Issue :
 * @class Status
 * @param value: string
 * @description : 이슈 상태에 관한 VO. 유효성 검사를 통해 상태에 부합한 값인지 확인한다.
 */
export class Status {
  value: IssueStatus;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('상태는 대기 또는 완료만 들어올 수 있다.');
    }
    this.value = value as IssueStatus;
  }

  private isValid(value: string): boolean {
    return Object.values(IssueStatus).includes(value as IssueStatus);
  }
}
