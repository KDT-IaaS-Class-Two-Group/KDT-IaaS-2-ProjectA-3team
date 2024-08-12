import {
  Controller,
  Body,
  HttpCode,
  Get,
  Post,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GetTeamHandler } from '../application/services/getTeam';
import { RES_ERROR_MSG } from 'src/api/common/enum/message/error/responseErrorMessage.enum';
import { InsertTeam } from '../application/services/insertTeam';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('/team')
@ApiTags('Team API')
export class TeamController {
  constructor(
    private readonly getTeamHandler: GetTeamHandler,
    private readonly insertTeam: InsertTeam,
  ) {}

  @Get('/all')
  @ApiOperation({
    summary: '모든 팀 데이터를 조회하는 엔드포인트',
    description: '데이터베이스에서 모든 팀의 정보를 조회하는 엔드포인트.',
  })
  @ApiOkResponse({
    description: '성공적으로 모든 팀 데이터를 반환하는 응답이다.',
  })
  async getAllData() {
    try {
      const data = await this.getTeamHandler.getAllTeams();
      return data;
    } catch (error) {
      throw new HttpException(
        RES_ERROR_MSG.FAILED_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/save')
  @HttpCode(200)
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
  async saveTeam(@Body() data, @Res() response: Response) {
    try {
      this.insertTeam.saveTeamData(data);
      return response.json({ message: 'success' });
    } catch (error) {
      response.status(HttpStatus.UNAUTHORIZED);
    }
  }
}
