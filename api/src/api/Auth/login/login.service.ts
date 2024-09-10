import { Injectable } from '@nestjs/common';
import { SessionDTO, UserDTO } from '@shared/DTO/SharedDTO';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';

/**
 *
 * * Class : LoginService
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-06
 * Issue :
 * @class LoginService
 * @param private queryBuilder : QueryBuilder- 쿼리를 생성 및 실행하는 QueryBuilder 클래스 인스턴스입니다.
 * @description :사용자가 입력한 ID와 비밀번호를 검증하고, 역할 기반의 세션을 생성하여 반환하는 역할을 수행합니다.
 * ? 07/31 :
 * 1. UserRepository 를 통해 Database에 접근, 유효성 검사 실행.
 * ? 08/01 :
 * 1. UserRepository에서 QueryBuilder를 사용하여 처리하는 방식으로 변경
 * 2. 세션 처리를 컨트롤러에서 직접 수행하는 것이 아닌, 서비스에서 수행할 수 있도록 변경
 */

@Injectable()
export class LoginService {
  private tableName = 'users';
  private roleTableNames = [
    'admin_role_users',
    'leader_role_users',
    'sub_admin_role_users',
    'employee_role_users',
  ];

  constructor(private readonly queryBuild: QueryBuilder) {}

  /**
   * validateUser 메서드는 사용자의 ID와 비밀번호를 기반으로 유효성을 검증합니다.
   *
   * @param {string} user_id - 검증할 사용자의 ID입니다.
   * @param {string} password - 검증할 사용자의 비밀번호입니다.
   * @returns {Promise<UserDTO | null>} 유저 정보가 유효하면 UserDTO 객체를 반환하고,
   * 유효하지 않으면 null을 반환합니다.
   */
  async validateUser(
    user_id: string,
    password: string,
  ): Promise<UserDTO | null> {
    // 유저 테이블에서 ID에 맞는 유저 데이터를 조회합니다.
    const userData = await this.queryBuild
      .SELECT(this.tableName) // 'users' 테이블에서 선택합니다.
      .WHERE('user_id = $1', [user_id]) // 조건절: user_id가 입력값과 일치하는 행을 찾습니다.
      .execution(); // 쿼리를 실행하여 결과를 반환합니다.

    // 조회한 유저 데이터가 있고, 비밀번호가 일치하는 경우 유저 데이터를 반환합니다.
    if (userData[0] && userData[0].password === password) {
      return userData[0];
    }
    // 유효하지 않으면 null을 반환합니다.
    return null;
  }

  /**
   * createSession 메서드는 사용자의 역할에 따라 세션 정보를 생성합니다.
   *
   * @param {UserDTO} data - 세션을 생성할 유저의 정보를 담은 객체입니다.
   * @returns {Promise<SessionDTO | null>} 세션 생성이 성공하면 SessionDTO 객체를 반환하고,
   * 실패하면 null을 반환합니다.
   * @throws {Error} 역할을 찾을 수 없거나 오류 발생 시 예외를 발생시킵니다.
   */
  async createSession(data: UserDTO): Promise<SessionDTO | null> {
    try {
      // 역할 테이블을 순차적으로 탐색하여 역할을 찾습니다.
      for (const roleTableName of this.roleTableNames) {
        // 해당 유저 ID에 맞는 역할 정보를 테이블에서 조회합니다.
        const roleData = await this.queryBuild
          .SELECT(roleTableName) // 역할 테이블에서 선택합니다.
          .WHERE('user_id = $1', [data.user_id]) // 조건절: user_id가 일치하는 행을 찾습니다.
          .execution(); // 쿼리를 실행하여 결과를 반환합니다.

        // 역할 정보가 존재하면 해당 정보를 세션 객체로 반환합니다.
        if (roleData[0]) {
          return roleData[0] as SessionDTO;
        }
      }
      // 역할을 찾을 수 없으면 에러를 발생시킵니다.
      throw new Error('해당 사용자의 역할을 찾을 수 없습니다');
    } catch (error) {
      // 에러 로그를 출력하고, 세션 생성 실패 시 예외를 던집니다.
      console.error('Failed Create Session : ', error);
      throw new Error('CREATE SESSION ERROR');
    }
  }
}
