import { Controller, Get } from '@nestjs/common';
import UsersRepository from 'src/database/users.repository';

@Controller('/getUser')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get('/all')
  async CheckUser() {
    const obj = await this.usersRepository.findAll();
    return obj;
  }
}
