/**
 * * Class : IssueName
 * 작성자 : @naviadev / 2024-08-13
 * 편집자 : @naviadev / 2024-08-13
 * Issue :
 * @class IssueName
 * @param value: string
 * @description : 이슈 이름에 관한 VO. IssueEntity를 구성하는 객체이며, issue의 이름을 가진 객체. 간단한 유효성 검사를 실행한다.
 */
export class IssueName {
  value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('이슈 이름에 대한 유효성 검사가 일치하지 않음.');
    }
    this.value = value;
  }

  private isValid(value: string): boolean {
    return value.length > 0 && value.length <= 255;
  }
}
