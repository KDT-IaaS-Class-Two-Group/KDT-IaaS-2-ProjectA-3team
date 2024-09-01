import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { GetTeamAllQueryHandler } from '../../application/query/handler/get_team_all.query.handler';
import { RES_ERROR_MSG } from 'src/api/common/enum/message/error/responseErrorMessage.enum';

@Controller('/team')
export class TeamQueryController {
  constructor(
    private readonly getTeamAllQueryHandler: GetTeamAllQueryHandler,
  ) {}

  @Get('/all')
  async getAllTeamList() {
    try {
      const data = await this.getTeamAllQueryHandler.execute();
      return data;
    } catch (error) {
      throw new HttpException(
        RES_ERROR_MSG.FAILED_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
