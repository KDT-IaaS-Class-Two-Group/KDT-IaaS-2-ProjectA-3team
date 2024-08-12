/**
 * * Class : StackName
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @class StackName
 * @param value: string
 * @description : 스택 이름에 관한 VO. StackEntity를 구성하는 객체이며, stack의 이름을 가진 객체. 간단한 유효성 검사를 실행한다.
 */
export class StackName {
  value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('Stack 이름에 대한 유효성 검사가 일치하지 않음.');
    }
    this.value = value;
  }

  // 한글 영어 숫자만 허락될 수 있는 형태로 작성하였다.
  private isValid(value: string): boolean {
    const validRegex = /^[가-힣A-Za-z0-9]+$/;
    return validRegex.test(value);
  }
}
