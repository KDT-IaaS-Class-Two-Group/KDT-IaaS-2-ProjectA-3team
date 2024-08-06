import { Module } from '@nestjs/common';
import { PendingProcessController } from './pending_process.controller';
import { ApproveService } from './approve/approve.service';
import { QueryBuilder } from 'src/database/queryBuilder';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [PendingProcessController],
  providers: [ApproveService, QueryBuilder, DatabaseService],
})
export class PendingProcessModule {}
