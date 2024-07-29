import { Injectable } from '@nestjs/common';
import { RegisterDataDTO } from '@shared/DTO/SharedDTO';

import { AuthService } from '../auth.service';

@Injectable()
export class LoginService {
  constructor(private authService: AuthService) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<RegisterDataDTO | null> {
    const user = await this.authService.findUserEmailInDatabase(email);

    if (user && password === user.password) {
      return user;
    }
    return null;
  }
}
