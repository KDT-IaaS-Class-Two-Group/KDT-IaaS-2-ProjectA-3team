import { Controller, Get, Param } from '@nestjs/common';
import { TableService } from '../../../database/infrastructure/table.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
@Controller('api/tables/:tableName/structure')
@ApiTags('Table Structure API')
export class StructureController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  @ApiOperation({
    summary: '테이블 구조를 조회하는 엔드포인트',
    description:
      '특정 테이블의 구조를 조회하는 엔드포인트입니다. 테이블의 컬럼 정보 등을 반환합니다.',
  })
  @ApiParam({
    name: 'tableName',
    required: true,
    description: '구조를 조회할 테이블의 이름',
  })
  @ApiOkResponse({
    description: '테이블 구조를 성공적으로 반환하는 응답.',
  })
  getTableStructure(@Param('tableName') tableName: string) {
    return this.tableService.getTableStructure(tableName);
  }
}
