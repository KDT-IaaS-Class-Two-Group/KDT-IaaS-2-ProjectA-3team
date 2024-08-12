import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { QueryBuilder } from 'src/database/queryBuilder';
import { ProjectController } from './interface/project.controller';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [QueryBuilder, DatabaseService, ProjectService],
})
export class ProjectModule {}
