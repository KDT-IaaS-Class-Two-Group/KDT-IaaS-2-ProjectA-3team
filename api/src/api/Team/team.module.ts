import { Module } from '@nestjs/common';
import { TeamController } from './interface/team.controller';
import { GetTeamHandler } from './application/services/getTeam';
import { DatabaseService } from 'src/database/database.service';
import { QueryBuilder } from 'src/database/queryBuilder';
import { TeamRepository } from '../common/infrastructure/Repository/team.repository';
import { InsertTeam } from './application/services/insertTeam';

const Application = [GetTeamHandler, InsertTeam];
const DatabaseProvider = [DatabaseService, QueryBuilder, TeamRepository];

@Module({
  controllers: [TeamController],
  providers: [...DatabaseProvider, ...Application],
})
export class TeamModule {}
