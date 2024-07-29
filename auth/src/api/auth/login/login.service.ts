import { Injectable } from '@nestjs/common';
import { RegisterDataDTO } from '@shared/DTO/SharedDTO';

import UserRepository from 'src/database/users.repository';

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
