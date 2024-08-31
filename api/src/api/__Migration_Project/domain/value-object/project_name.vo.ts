/**
 * * Class : ProjectName
 * 작성자 : @naviadev / 2024-08-13
 * 편집자 : @naviadev / 2024-08-30
 * Issue :
 * @class ProjectStartDate
 * @param value: string
 * @description : 프로젝트 이름 vo 객체
 */
export class ProjectName {
  value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('프로젝트 이름에 대한 유효성 검사가 일치하지 않음.');
    }
    this.value = value;
  }

  private isValid(value: string): boolean {
    return value.length > 0 && value.length <= 255;
  }

  getValue() {
    return this.value;
  }
}
