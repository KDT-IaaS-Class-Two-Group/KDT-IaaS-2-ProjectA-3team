import { Controller, Get } from "@nestjs/common";
import { TableService } from "../../../database/table.service";

@Controller("api/tables")
export class TablesController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  async getTables() {
    return this.tableService.getTables();
  }
}
