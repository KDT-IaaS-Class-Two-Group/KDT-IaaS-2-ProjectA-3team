import { Injectable } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { UserDTO } from "../../../shared/DTO/SharedDTO";

@Injectable()
class UsersRepository {
  private readonly tableName: string = "users";
  constructor(private readonly dbService: DatabaseService) {}

  async findAll() {
    const result = await this.dbService.query(
      `SELECT * FROM ${this.tableName}`
    );
    return result.rows;
  }

  async findOneByUser(user_id: string) {
    const result = await this.dbService.query(
      `SELECT * FROM ${this.tableName} WHERE user_id = $1`,
      [user_id]
    );
    return result.rows[0];
  }

  async InsertNewUser(userData: UserDTO) {
    const {
      user_id,
      username,
      birth_date,
      address,
      phone,
      email,
      password,
      // role_name,
      // salary,
      // field_name,
    } = userData;

    const params = [
      user_id,
      username,
      birth_date,
      address,
      phone,
      email,
      password,
      // role_name,
      // salary,
      // field_name,
    ];

    const text = `
      INSERT INTO ${this.tableName} (
        user_id,
        username,
        birth_date,
        address,
        phone,
        email,
        password,
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    /** 제외된 항목 - 추후 추가
     * role_name,
        salary,
        field_name
     */
    try {
      await this.dbService.query(text, params);
    } catch (error) {
      console.error("executing Query Error - 쿼리문 실행 불가 . :", error);
      throw new Error("Database error");
    }
  }
}

export default UsersRepository;
