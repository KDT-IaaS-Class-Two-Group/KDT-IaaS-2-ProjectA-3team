import { Controller, Get, Param } from '@nestjs/common';
import { TableService } from '../../../database/infrastructure/table.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
@Controller('api/tables/:tableName/data')
@ApiTags('Table Data API')
export class DataController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  @ApiOperation({
    summary: '테이블 데이터를 조회하는 엔드포인트',
    description:
      '특정 테이블의 데이터를 조회하는 엔드포인트입니다. 테이블에 있는 모든 행의 데이터를 반환합니다.',
  })
  @ApiParam({
    name: 'tableName',
    required: true,
    description: '데이터를 조회할 테이블의 이름',
  })
  @ApiOkResponse({
    description: '테이블 데이터를 성공적으로 반환하는 응답.',
  })
  getTableData(@Param('tableName') tableName: string) {
    return this.tableService.getTableData(tableName);
  }
}
