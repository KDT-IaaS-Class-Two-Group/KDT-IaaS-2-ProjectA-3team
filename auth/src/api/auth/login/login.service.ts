import { Injectable } from '@nestjs/common';
import { SessionDTO, UserDTO } from '@shared/DTO/SharedDTO';
import { QueryBuilder } from 'src/database/queryBuilder';
/**
 *
 * * Class : LoginService
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-02
 * Issue :
 * @class LoginService
 * @param private queryBuilder : QueryBuilder
 * @description :
 * ? 07/31 :
 * 1. UserRepository 를 통해 Database에 접근, 유효성 검사 실행.
 * ? 08/01 :
 * 1. UserRepository에서 QueryBuilder를 사용하여 처리하는 방식으로 변경
 * 2. 세션 처리를 컨트롤러에서 직접 수행하는 것이 아닌, 서비스에서 수행할 수 있도록 변경
 */

@Injectable()
export class LoginService {
  private tableName = 'users';
  private roleTableName = 'relation_users_role';

  constructor(private readonly queryBuild: QueryBuilder) {}
  async validateUser(
    user_id: string,
    password: string,
  ): Promise<UserDTO | null> {
    const userData = await this.queryBuild
      .SELECT(['*'], this.tableName)
      .WHERE('user_id = $1', user_id)
      .execution();

    if (userData[0] && userData[0].password == password) {
      return userData[0];
    }
    return null;
  }

  async createSession(data: UserDTO) {
    try {
      const role_Object: SessionDTO = (await this.queryBuild
        .SELECT(['*'], this.roleTableName)
        .WHERE('user_id = $1', data.user_id)
        .execution()) as SessionDTO;
      return role_Object[0];
    } catch (error) {
      console.error('세션 생성 실패 : ', error);
      throw new Error('세션 생성 실패');
    }
  }
}
