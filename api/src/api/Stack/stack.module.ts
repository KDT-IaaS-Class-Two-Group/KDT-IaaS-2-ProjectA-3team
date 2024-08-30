import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/infrastructure/database.service';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { Stackcontroller } from './presentation/stack.controller';
import { StackCommandHandler } from './application/command/handler/stack.command.service';
import { StackQueryHandler } from './application/query/handler/stack.query.service';
import { StackRepository } from './infrastructure/repository/stack.repository';

const dbProviders = [QueryBuilder, DatabaseService];

/**
 * * Decorator : Module
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @decorator Module
 * @description : Stack 관련 Command, Query를 주입한다.
 */
@Module({
  providers: [
    ...dbProviders,
    StackCommandHandler,
    StackQueryHandler,
    StackRepository,
  ],
  controllers: [Stackcontroller],
})
export class StackModule {}
