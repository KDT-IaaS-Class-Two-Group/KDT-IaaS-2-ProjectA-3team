import { Controller, Post, Param, Body } from '@nestjs/common';
import { TableService } from '../../../../database/infrastructure/table.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@Controller('api/tables/:tableName/rows')
@ApiTags('Table Rows API')
export class RowsController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @ApiOperation({
    summary: '테이블에 새로운 행을 추가하는 엔드포인트',
    description:
      '특정 테이블에 새로운 행을 추가하는 엔드포인트입니다. "stack" 및 "field" 테이블에만 행을 추가할 수 있습니다.',
  })
  @ApiParam({
    name: 'tableName',
    required: true,
    description: '행을 추가할 테이블의 이름 ("stack" 또는 "field"만 허용됨)',
  })
  @ApiBody({
    description: '추가할 행의 데이터',
    type: Object,
  })
  @ApiCreatedResponse({
    description: '새로운 행이 성공적으로 추가되었을 때의 응답.',
  })
  @ApiBadRequestResponse({
    description:
      '"stack" 및 "field" 이외의 테이블에 행을 추가하려고 할 때의 오류 응답.',
  })
  async addRow(@Param('tableName') tableName: string, @Body() rowData: any) {
    if (!['stack', 'field'].includes(tableName)) {
      throw new Error(
        'Only "stack" and "field" tables are allowed for adding new rows.',
      );
    }
    return this.tableService.addRow(tableName, rowData);
  }
}
