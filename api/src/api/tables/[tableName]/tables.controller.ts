import { Controller, Get } from '@nestjs/common';
import { TableService } from '../../../database/infrastructure/table.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@Controller('api/tables')
@ApiTags('Table API')
export class TablesController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  @ApiOperation({
    summary: '테이블 목록을 조회하는 엔드포인트',
    description:
      '데이터베이스에 있는 모든 테이블의 목록을 조회하는 엔드포인트.',
  })
  @ApiOkResponse({
    description: '테이블 목록을 성공적으로 반환하는 응답.',
  })
  async getTables() {
    return this.tableService.getTables();
  }
}
