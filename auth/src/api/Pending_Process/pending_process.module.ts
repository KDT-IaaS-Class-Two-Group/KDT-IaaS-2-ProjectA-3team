import { Module } from '@nestjs/common';
import { PendingProcessController } from './pending_process.controller';
import { ApproveService } from './approve/approve.service';
import { QueryBuilder } from 'src/database/queryBuilder';
import { DatabaseService } from 'src/database/database.service';
import { CancelService } from './cancel/cancle.service';

@Module({
  controllers: [PendingProcessController],
  providers: [ApproveService, QueryBuilder, DatabaseService, CancelService],
})
export class PendingProcessModule {}
