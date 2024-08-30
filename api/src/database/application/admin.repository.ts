import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../infrastructure/database.service';
import { UserDTO } from '../../../../shared/DTO/SharedDTO';

@Injectable()
/**
 * * Class : AdminRepository
 * 작성자 : @dalramjwi / 2024-08-30
 * 편집자 : @dalramjwi / 2024-08-30
 * Issue : 
 * @class AdminRepository


 * @param private readonly dbService: DatabaseService
 * @description AdminRepository 클래스는 관리자 테이블과 상호작용하는 메서드를 제공하는 저장소입니다.
 * 이 클래스는 데이터베이스와 직접적으로 상호작용하여 관리자 데이터를 조회하고 추가하는 기능을 수행합니다.
 */
class AdminRepository {
  /**
   * AdminRepository 클래스의 생성자입니다.
   * @param {DatabaseService} dbService - DatabaseService 인스턴스, 데이터베이스와의 상호작용을 처리합니다.
   */
  constructor(private readonly dbService: DatabaseService) {}

  /**
   * 모든 관리자 데이터를 조회하는 메서드입니다.
   * @returns {Promise<any[]>} 데이터베이스에서 조회한 모든 관리자 데이터를 반환합니다.
   */
  async findAll(): Promise<any[]> {
    const result = await this.dbService.query('SELECT * FROM admin');
    return result.rows;
  }

  /**
   * 특정 사용자 ID로 관리자를 조회하는 메서드입니다.
   * @param {string} user_id - 조회할 관리자의 사용자 ID
   * @returns {Promise<any>} 해당 사용자 ID에 대한 관리자 데이터를 반환합니다.
   */
  async findOneByUser(user_id: string): Promise<any> {
    const result = await this.dbService.query(
      'SELECT * FROM admin WHERE user_id = $1',
      [user_id],
    );
    return result.rows[0];
  }

  /**
   * 새로운 사용자를 관리자 테이블에 추가하는 메서드입니다.
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
      INSERT INTO users (
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
     * salary,
     * field_name
     */
    try {
      await this.dbService.query(text, params);
    } catch (error) {
      console.error('executing Query Error - 쿼리문 실행 불가 :', error);
      throw new Error('Database error');
    }
  }
}

export default AdminRepository;
