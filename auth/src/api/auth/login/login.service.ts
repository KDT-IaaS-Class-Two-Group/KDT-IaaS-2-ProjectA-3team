import { Injectable } from '@nestjs/common';
import { UserDTO } from '@shared/DTO/SharedDTO';

import UserRepository from '../../../database/pending_users.repository';
/**
 * * Class : LoginService
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue : 
 * @class LoginService


 * @param private userRepository: UserRepository
 * @description : UserRepository 를 통해 Database에 접근, 유효성 검사 실행. 
 */
@Injectable()
export class LoginService {
  constructor(private userRepository: UserRepository) {}
  async validateUser(
    user_id: string,
    password: string,
  ): Promise<UserDTO | null> {
    const user = await this.userRepository.findOneByUser(user_id);
    if (user && password === user.password) {
      return user;
    }
    return null;
  }
}
