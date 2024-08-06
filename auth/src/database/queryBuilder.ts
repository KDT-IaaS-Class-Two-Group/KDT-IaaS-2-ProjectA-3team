import { Injectable } from "@nestjs/common";
import { DatabaseService } from "./database.service";

@Injectable()
export class QueryBuilder {
  private queryString: string = "";
  private params: any[] = [];

  constructor(private readonly databaseService: DatabaseService) {}

  private RESET() {
    this.queryString = "";
    this.params = [];
  }

  async execution() {
    try {
      console.log("Executing query:", this.queryString);
      console.log("With params:", this.params);
      const result = await this.databaseService.query(
        this.queryString,
        this.params
      );
      return result.rows; // 결과를 rows로 반환 (PostgreSQL의 경우)
    } catch (error) {
      console.error("Failed execution:", error);
      throw new Error("Database error");
    }
  }

  SELECT(columns: string[], tableName: string) {
    this.RESET();
    this.queryString = `SELECT ${columns.join(", ")} FROM ${tableName}`;
    return this;
  }

  WHERE(condition: string, value: any) {
    if (this.queryString.includes("WHERE")) {
      this.queryString += ` AND ${condition}`;
    } else {
      this.queryString += ` WHERE ${condition}`;
    }
    this.params.push(value);
    return this;
  }

  INSERT(tableName: string, data: { [key: string]: any }) {
    this.RESET();
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");

    this.queryString = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${placeholders})`;
    this.params = values;
    return this;
  }

  UPDATE(
    tableName: string,
    data: { [key: string]: any },
    condition: string,
    conditionValue: any
  ) {
    this.RESET();
    const columns = Object.keys(data);
    const placeholders = columns
      .map((col, index) => `${col} = $${index + 1}`)
      .join(", ");

    const values = Object.values(data);

    this.queryString = `UPDATE ${tableName} SET ${placeholders} WHERE ${condition}`;
    this.params = [...values, conditionValue];
    return this;
  }

  DELETE(tableName: string, condition: string, conditionValue: any) {
    this.RESET();
    this.queryString = `DELETE FROM ${tableName} WHERE ${condition}`;
    this.params = [conditionValue];
    return this;
  }
}
