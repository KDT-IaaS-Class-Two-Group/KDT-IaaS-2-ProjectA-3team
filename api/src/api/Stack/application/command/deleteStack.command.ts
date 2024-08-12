/**
 * * Class : DeleteStackCommand
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @class DeleteStackCommand
 * @param public readonly stack_name: string
 * @description : 삭제가 요청된 스택의 이름을 기준으로 쓰기 작업을 수행할 수 있는 Command
 */
export class DeleteStackCommand {
  constructor(public readonly stack_name: string) {}
}
