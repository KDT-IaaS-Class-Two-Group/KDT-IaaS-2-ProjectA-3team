import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { GetTeamHandler } from '../application/services/getTeam';
import { RES_ERROR_MSG } from 'src/api/common/enum/message/error/responseErrorMessage.enum';

@Controller('/team')
export class TeamController {
  constructor(private readonly getTeamHandler: GetTeamHandler) {}

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
}
