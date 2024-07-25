import { Injectable } from '@nestjs/common';
import { CreateUserInterface } from '@shared/DTO/SharedDTO';

import { AuthService } from '../auth.service';

@Injectable()
export class LoginService {
  constructor(private authService: AuthService) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<CreateUserInterface | null> {
    const user = await this.authService.findUserEmailInDatabase(email);

    if (user && password === user.password) {
      return user;
    }
    return null;
  }
}
