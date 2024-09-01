import { Controller, Put, Param, Body } from '@nestjs/common';
import { TableService } from '../../../../database/infrastructure/table.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
@Controller('api/tables/:tableName/rows/:rowId')
@ApiTags('Table Row API')
export class RowController {
  constructor(private readonly tableService: TableService) {}

  @Put()
  @ApiOperation({
    summary: '테이블의 특정 행을 업데이트하는 엔드포인트',
    description:
      '특정 테이블의 특정 행을 업데이트하는 엔드포인트입니다. "stack" 및 "field" 테이블에만 행을 업데이트할 수 있습니다.',
  })
  @ApiParam({
    name: 'tableName',
    required: true,
    description:
      '업데이트할 행이 포함된 테이블의 이름 ("stack" 또는 "field"만 허용됨)',
  })
  @ApiParam({
    name: 'rowId',
    required: true,
    description: '업데이트할 행의 ID',
  })
  @ApiBody({
    description: '업데이트할 행의 데이터',
    type: Object,
  })
  @ApiOkResponse({
    description: '행이 성공적으로 업데이트되었을 때의 응답.',
  })
  @ApiBadRequestResponse({
    description:
      '"stack" 및 "field" 이외의 테이블에 행을 업데이트하려고 할 때의 오류 응답.',
  })
  async updateRow(
    @Param('tableName') tableName: string,
    @Param('rowId') rowId: string,
    @Body() rowData: any,
  ) {
    if (!['stack', 'field'].includes(tableName)) {
      throw new Error(
        'Only "stack" and "field" tables are allowed for updating rows.',
      );
    }
    return this.tableService.updateRow(tableName, rowId, rowData);
  }
}
