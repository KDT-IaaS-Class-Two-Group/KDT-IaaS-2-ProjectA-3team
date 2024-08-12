import { Injectable } from '@nestjs/common';
import { StackRepository } from 'src/api/Stack/infrastructure/repository/stack.repository';
import { CreateStackCommand } from '../createStack.command';
import { Stack } from 'src/api/Stack/domain/entities/stack.entity';
import { DeleteStackCommand } from '../deleteStack.command';

/**
 * * Decorator : Injectable
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @decorator Injectable
 * @description : 쓰는 작업을 수행하는 핸들러.
 * Repository를 통해 간접적으로 데이터베이스에 접근하고, 쓰기 작업을 수행한다.
 */
@Injectable()
export class StackCommandHandler {
  constructor(private readonly stackRepository: StackRepository) {}

  async handleCreateStack(command: CreateStackCommand): Promise<void> {
    const stack: Stack = Stack.create(command.stack_name, command.stack_type);
    await this.stackRepository.addStack(stack);
  }

  async handleDeleteStack(command: DeleteStackCommand): Promise<void> {
    await this.stackRepository.deleteStack(command.stack_name);
  }
}
