/**
 * * Class : CreateStackCommand
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @class CreateStackCommand
 * @param public readonly stack_name: string, public readonly stack_type: string
 * @description : Stack 테이블에 레코드를 추가하는 Command
 */
export class CreateStackCommand {
  constructor(
    public readonly stack_name: string,
    public readonly stack_type: string,
  ) {}
}
