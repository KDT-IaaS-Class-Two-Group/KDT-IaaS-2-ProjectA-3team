import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { PostTeamCommandHandler } from '../../application/command/handler/team.command.handler';
import { TeamDTO } from '../dto/team.dto';
import { PostTeamCommand } from '../../application/command/handler/post_team.command';
import { Response } from 'express';

@Controller('/team')
export class TeamCommandController {
  constructor(private readonly saveTeamHandler: PostTeamCommandHandler) {}
  @Post('/save')
  async saveTeam(@Body() data: TeamDTO, @Res() response: Response) {
    const command = new PostTeamCommand(
      data.team_name,
      data.description,
      data.team_leader,
      data.team_members,
    );
    try {
      this.saveTeamHandler.execute(command);
      return response.json({ message: 'success' });
    } catch (error) {
      response.status(HttpStatus.UNAUTHORIZED);
    }
  }
}
