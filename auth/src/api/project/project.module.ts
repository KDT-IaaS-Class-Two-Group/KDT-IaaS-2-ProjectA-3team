import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { QueryBuilder } from 'src/database/queryBuilder';
import { ProjectController } from './project.controller';
import { ProjectCreateService } from './create/project_create.service';

@Module({
  controllers: [ProjectController],
  providers: [QueryBuilder, DatabaseService, ProjectCreateService],
})
export class ProjectModule {}
