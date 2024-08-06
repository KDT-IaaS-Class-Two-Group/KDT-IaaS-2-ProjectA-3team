import { Controller, Put, Param, Body } from '@nestjs/common';
import { TableService } from '../../../../database/table.service';

@Controller('api/tables/:tableName/rows/:rowId')
export class RowController {
  constructor(private readonly tableService: TableService) {}

  @Put()
  async updateRow(
    @Param('tableName') tableName: string,
    @Param('rowId') rowId: string,
    @Body() rowData: any,
  ) {
    if (!['stack', 'field'].includes(tableName)) {
      throw new Error('Only "stack" and "field" tables are allowed for updating rows.');
    }
    return this.tableService.updateRow(tableName, rowId, rowData);
  }
}
