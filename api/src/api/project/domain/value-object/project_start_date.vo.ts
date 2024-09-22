/**
 * * Class : ProjectStartDate
 * 작성자 : @naviadev / 2024-08-13
 * 편집자 : @naviadev / 2024-08-13
 * Issue :
 * @class ProjectStartDate
 * @param value: Date
 * @description : 프로젝트 시작 날짜에 관한 VO. 프로젝트의 시작 날짜에 대한 유효성 검사를 실행한다.
 */
export class ProjectStartDate {
  value: Date;

  constructor(value: Date) {
    if (!this.isValid(value)) {
      throw new Error('프로젝트 시작 날짜에 대한 유효성 검사가 일치하지 않음.');
    }
    this.value = value;
  }

  private isValid(value: Date): boolean {
    // const today = new Date();

    // return value.getTime() >= today.getTime();
    return true;
  }
}

/**
 * * Class : TeamName
 * 작성자 : @naviadev / 2024-08-13
 * 편집자 : @naviadev / 2024-08-13
 * Issue :
 * @class TeamName
 * @param value: string
 * @description : 팀 이름에 관한 VO. 팀 이름의 유효성 검사를 실행한다.
 */
export class TeamName {
  value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('팀 이름에 대한 유효성 검사가 일치하지 않음.');
    }
    this.value = value;
  }

  private isValid(value: string): boolean {
    // 팀 이름은 최소 1자 이상, 255자 이하여야 함
    return value.length > 0 && value.length <= 255;
  }
}
