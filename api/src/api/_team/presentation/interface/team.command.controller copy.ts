import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { PostTeamCommandHandler } from '../../application/command/handler/team.command.handler';
import { TeamDTO } from '../dto/team.dto';
import { PostTeamCommand } from '../../application/command/handler/post_team.command';
import { Response } from 'express';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/team')
@ApiTags('Team Command API')
export class TeamCommandController {
  constructor(private readonly saveTeamHandler: PostTeamCommandHandler) {}
  @ApiOperation({
    summary: '팀 데이터를 저장하는 엔드포인트',
    description: '전달받은 팀 데이터를 데이터베이스에 저장하는 엔드포인트이다.',
  })
  @ApiBody({
    description: '저장할 팀 데이터의 형태를 정의한다.',
  })
  @ApiCreatedResponse({
    description: '성공적으로 팀 데이터를 저장한 후의 응답이다.',
    schema: {
      example: {
        message: 'success',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '권한이 없는 요청에 대한 응답이다.',
  })
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
