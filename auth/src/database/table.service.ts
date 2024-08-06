import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class TableService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllRows(tableName: string) {
    const idField = tableName === 'stack' ? 'stack_name' : 'field_name';
    const table = await this.databaseService.query(
      `SELECT * FROM ${tableName} ORDER BY ${idField}`,
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

    // 추가된 데이터를 반환
    const idField = tableName === 'stack' ? 'stack_name' : 'field_name';
    const addedRow = await this.databaseService.query(
      `SELECT * FROM ${tableName} WHERE ${idField} = $1 ORDER BY ${idField}`,
      [rowData[idField]],
    );

    return addedRow.rows[0];
  }

  async updateRow(tableName: string, rowId: string, rowData: any) {
    const idField = tableName === 'stack' ? 'stack_name' : 'field_name';
    
    // created_at 필드가 업데이트되지 않도록 rowData에서 제거
    delete rowData['created_at'];
    
    const updates = Object.keys(rowData)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');
    const values = [...Object.values(rowData), rowId];

    console.log(
      `Executing query: UPDATE ${tableName} SET ${updates} WHERE ${idField} = $${values.length}`,
      values,
    );

    const result = await this.databaseService.query(
      `UPDATE ${tableName} SET ${updates} WHERE ${idField} = $${values.length}`,
      values,
    );
    if (result.rowCount === 0) {
      throw new NotFoundException(
        `Row with ${idField} ${rowId} not found in table ${tableName}`,
      );
    }

    // 업데이트된 데이터를 반환
    const updatedRow = await this.databaseService.query(
      `SELECT * FROM ${tableName} WHERE ${idField} = $1 ORDER BY ${idField}`,
      [rowId],
    );

    return updatedRow.rows[0];
  }

  async deleteRow(tableName: string, rowId: string) {
    const idField = tableName === 'stack' ? 'stack_name' : 'field_name';
    const result = await this.databaseService.query(
      `DELETE FROM ${tableName} WHERE ${idField} = $1`,
      [rowId],
    );
    if (result.rowCount === 0) {
      throw new NotFoundException(
        `Row with ${idField} ${rowId} not found in table ${tableName}`,
      );
    }

    // 삭제된 데이터의 ID를 반환
    return { [idField]: rowId };
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

  async getTableData(tableName: string) {
    const idField = tableName === 'stack' ? 'stack_name' : 'field_name';
    const data = await this.databaseService.query(
      `SELECT * FROM ${tableName} ORDER BY ${idField}`
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
