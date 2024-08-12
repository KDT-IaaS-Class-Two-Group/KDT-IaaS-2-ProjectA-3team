export enum StackType {
  FRAMEWORK = 'Framework',
  LANGUAGE = 'Language',
  DATABASE = 'Database',
}

/**
 * * Class : StackTypeValueObject
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @class StackTypeValueObject
 * @param value: string
 * @description : Stack의 Type에 대한 VO. 유효성검사를 통해 Type에 부합한 값인지 확인한다.
 */
export class StackTypeValueObject {
  value: StackType;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('타입은 프레임워크, 언어, DB만 들어올 수 있다.');
    }
    this.value = value as StackType;
  }

  private isValid(value: string): boolean {
    return Object.values(StackType).includes(value as StackType);
  }
}
