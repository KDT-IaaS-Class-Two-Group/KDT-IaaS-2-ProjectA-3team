import { Controller, Get, Param } from '@nestjs/common';
import { TableService } from '../../../database/infrastructure/table.service';

@Controller('api/tables/:tableName/data')
export class DataController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  getTableData(@Param('tableName') tableName: string) {
    return this.tableService.getTableData(tableName);
  }
}
