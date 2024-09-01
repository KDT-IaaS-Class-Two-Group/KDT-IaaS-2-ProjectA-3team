/**
 * * Class : ProjectEndDate
 * 작성자 : @naviadev / 2024-08-30
 * 편집자 : @naviadev / 2024-08-30
 * @class ProjectEndDate
 * @param value: Date
 * @description : 마감일 객체
 */
export class ProjectEndDate {
  value: Date;

  constructor(value: Date) {
    if (!this.isValid(value)) {
      throw new Error('프로젝트 종료 날짜에 대한 유효성 검사가 일치하지 않음.');
    }
    this.value = value;
  }

  private isValid(value: Date): boolean {
    // 종료 날짜는 시작 날짜보다 이후여야 함
    const today = new Date();
    return value.getTime() >= today.getTime();
  }
}
