import { Controller, Post, Param, Body } from "@nestjs/common";
import { TableService } from "../../../../database/table.service";

@Controller("api/tables/:tableName/rows")
export class RowsController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  async addRow(@Param("tableName") tableName: string, @Body() rowData: any) {
    if (!["stack", "field"].includes(tableName)) {
      throw new Error(
        'Only "stack" and "field" tables are allowed for adding new rows.'
      );
    }
    return this.tableService.addRow(tableName, rowData);
  }
}
