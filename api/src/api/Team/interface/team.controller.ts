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

@Controller('/team')
export class TeamController {
  constructor(
    private readonly getTeamHandler: GetTeamHandler,
    private readonly insertTeam: InsertTeam,
  ) {}

  @Get('/all')
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
  async saveTeam(@Body() data, @Res() response: Response) {
    try {
      this.insertTeam.saveTeamData(data);
      return response.json({ message: 'success' });
    } catch (error) {
      response.status(HttpStatus.UNAUTHORIZED);
    }
  }
}
