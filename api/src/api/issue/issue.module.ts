import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/infrastructure/database.service';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { IssueRepository } from './infrastructure/repository/issue.repository';
import { IssueQueryHandler } from './application/query/handler/issue.query.service';
import { IssueCommandHandler } from './application/command/handler/issue.command.service';
import { IssueCommandController } from './presentation/issue.command.controller';
import { IssueQueryController } from './presentation/issue.query.controller';

const databaseService = [DatabaseService, QueryBuilder, IssueRepository];
const Handler = [IssueQueryHandler, IssueCommandHandler];
const controller = [IssueCommandController, IssueQueryController];
@Module({
  providers: [...databaseService, ...Handler],
  controllers: [...controller],
})
export class IssueModule {}
