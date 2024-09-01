import { Module } from '@nestjs/common';
import { TeamQueryController } from './presentation/interface/team.query.controller';
import { TeamCommandController } from './presentation/interface/team.command.controller copy';
import { TeamRepository } from './infrastructure/team.repository';
import { DatabaseService } from 'src/database/infrastructure/database.service';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { PostTeamCommandHandler } from './application/command/handler/team.command.handler';
import { GetTeamAllQueryHandler } from './application/query/handler/get_team_all.query.handler';

@Module({
  controllers: [TeamQueryController, TeamCommandController],
  providers: [
    TeamRepository,
    DatabaseService,
    QueryBuilder,
    PostTeamCommandHandler,
    GetTeamAllQueryHandler,
  ],
})
export class TeamModule {}
