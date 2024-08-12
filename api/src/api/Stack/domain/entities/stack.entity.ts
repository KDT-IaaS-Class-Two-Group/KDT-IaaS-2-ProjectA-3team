import { StackName } from '../Value-Object/stack_name.vo';
import { StackTypeValueObject } from '../Value-Object/stack_type.vo';

/**
 * * Class : Stack
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @class Stack
 * @param name: StackName, type: StackTypeValueObject
 * @description : Stack Entity : static create 메서드를 통해 Body에 들어온 값을 StackEntity로 변환할 수 있도록 작성하였다.
 */
export class Stack {
  private stack_name: StackName;
  private stack_type: StackTypeValueObject;

  constructor(name: StackName, type: StackTypeValueObject) {
    this.stack_name = name;
    this.stack_type = type;
  }
  static create(stack: string, type: string) {
    return new Stack(new StackName(stack), new StackTypeValueObject(type));
  }
}
