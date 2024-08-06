import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class TableService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllRows(tableName: string) {
    const table = await this.databaseService.query(
      `SELECT * FROM ${tableName}`,
    );
    if (!table) {
      throw new NotFoundException(`Table ${tableName} not found`);
    }
    return table.rows;
  }

  async addRow(tableName: string, rowData: any) {
    const keys = Object.keys(rowData).join(', ');
    const values = Object.values(rowData);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    console.log(
      `Executing query: INSERT INTO ${tableName} (${keys}) VALUES (${placeholders})`,
      values,
    );

    await this.databaseService.query(
      `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders})`,
      values,
    );
    return rowData;
  }

  async updateRow(tableName: string, rowId: string, rowData: any) {
    const updates = Object.keys(rowData)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');
    const values = [...Object.values(rowData), rowId];

    console.log(
      `Executing query: UPDATE ${tableName} SET ${updates} WHERE id = $${values.length}`,
      values,
    );

    const result = await this.databaseService.query(
      `UPDATE ${tableName} SET ${updates} WHERE id = $${values.length}`,
      values,
    );
    if (result.rowCount === 0) {
      throw new NotFoundException(
        `Row with ID ${rowId} not found in table ${tableName}`,
      );
    }
    return rowData;
  }

  async deleteRow(tableName: string, rowId: string) {
    const result = await this.databaseService.query(
      `DELETE FROM ${tableName} WHERE id = $1`,
      [rowId],
    );
    if (result.rowCount === 0) {
      throw new NotFoundException(
        `Row with ID ${rowId} not found in table ${tableName}`,
      );
    }
    return { id: rowId };
  }

  async getTableStructure(tableName: string) {
    const structure = await this.databaseService.query(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1`,
      [tableName],
    );
    if (!structure) {
      throw new NotFoundException(`Table ${tableName} not found`);
    }
    return structure.rows;
  }

  async getTableData(tableName: string, limit: number = 5) {
    const data = await this.databaseService.query(
      `SELECT * FROM ${tableName} LIMIT $1`,
      [limit],
    );
    return data.rows;
  }

  async getTables(): Promise<{ table_name: string }[]> {
    const res = await this.databaseService.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
    `);
    return res.rows;
  }
}
