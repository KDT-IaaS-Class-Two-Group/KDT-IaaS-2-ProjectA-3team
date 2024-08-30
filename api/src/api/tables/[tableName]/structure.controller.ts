import { Controller, Get, Param } from '@nestjs/common';
import { TableService } from '../../../database/infrastructure/table.service';

@Controller('api/tables/:tableName/structure')
export class StructureController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  getTableStructure(@Param('tableName') tableName: string) {
    return this.tableService.getTableStructure(tableName);
  }
}
