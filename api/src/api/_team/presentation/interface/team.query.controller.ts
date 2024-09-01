import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { GetTeamAllQueryHandler } from '../../application/query/handler/get_team_all.query.handler';
import { RES_ERROR_MSG } from 'src/api/common/enum/message/error/responseErrorMessage.enum';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/team')
@ApiTags('Team Query API')
export class TeamQueryController {
  constructor(
    private readonly getTeamAllQueryHandler: GetTeamAllQueryHandler,
  ) {}

  @Get('/all')
  @ApiOperation({
    summary: '모든 팀 데이터를 조회하는 엔드포인트',
    description: '데이터베이스에서 모든 팀의 정보를 조회하는 엔드포인트.',
  })
  @ApiOkResponse({
    description: '성공적으로 모든 팀 데이터를 반환하는 응답이다.',
  })
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
