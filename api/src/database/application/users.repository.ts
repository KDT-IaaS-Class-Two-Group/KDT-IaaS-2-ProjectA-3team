import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../infrastructure/database.service';
import { UserDTO } from '../../../../shared/DTO/SharedDTO';

@Injectable()
/**
 * * Class : UsersRepository
 * 작성자 : @dalramjwi / 2024-08-30
 * 편집자 : @dalramjwi / 2024-08-30
 * Issue : 
 * @class UsersRepository


 * @param private readonly dbService: DatabaseService
 * @description  UsersRepository 클래스는 사용자 데이터를 처리하기 위한 데이터베이스 상호작용 메서드를 제공하는 저장소입니다.
 * 이 클래스는 사용자 데이터를 조회하고, 특정 사용자를 검색하며, 새로운 사용자를 추가하는 기능을 수행합니다.
 */
class UsersRepository {
  private readonly tableName: string = 'users';

  /**
   * UsersRepository 클래스의 생성자입니다.
   * @param {DatabaseService} dbService - DatabaseService 인스턴스, 데이터베이스와의 상호작용을 처리합니다.
   */
  constructor(private readonly dbService: DatabaseService) {}

  /**
   * 모든 사용자 데이터를 조회하는 메서드입니다.
   * @returns {Promise<any[]>} 데이터베이스에서 조회한 모든 사용자 데이터를 반환합니다.
   */
  async findAll(): Promise<any[]> {
    const result = await this.dbService.query(
      `SELECT * FROM ${this.tableName}`,
    );
    return result.rows;
  }

  /**
   * 특정 사용자 ID로 사용자를 조회하는 메서드입니다.
   * @param {string} user_id - 조회할 사용자의 ID
   * @returns {Promise<any>} 해당 사용자 ID에 대한 사용자 데이터를 반환합니다.
   */
  async findOneByUser(user_id: string): Promise<any> {
    const result = await this.dbService.query(
      `SELECT * FROM ${this.tableName} WHERE user_id = $1`,
      [user_id],
    );
    return result.rows[0];
  }

  /**
   * 새로운 사용자를 추가하는 메서드입니다.
   * @param {UserDTO} userData - 추가할 사용자 데이터 객체
   * @throws {Error} 데이터베이스 오류가 발생하면 예외를 던집니다.
   */
  async InsertNewUser(userData: UserDTO): Promise<void> {
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
        password
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
      console.error('executing Query Error - 쿼리문 실행 불가:', error);
      throw new Error('Database error');
    }
  }
}

export default UsersRepository;
