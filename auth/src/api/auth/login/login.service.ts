import { Injectable } from '@nestjs/common';
import { RegisterDataDTO } from '@shared/DTO/SharedDTO';

import UserRepository from 'src/database/users.repository';
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
    email: string,
    password: string,
  ): Promise<RegisterDataDTO | null> {
    const user = await this.userRepository.findOneByEmail(email);

    if (user && password === user.password) {
      return user;
    }
    return null;
  }
}
