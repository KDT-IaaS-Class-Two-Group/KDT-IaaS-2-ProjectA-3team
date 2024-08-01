import { Controller, Get } from '@nestjs/common';

import { QueryBuilder } from 'src/database/queryBuilder';
@Controller('/getUser')
export class UsersController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  @Get('/all')
  async CheckUser() {
    console.log(2);
    const obj = this.queryBuilder.SELECT(['*'], 'users').execution();
    console.log(obj);
    // -> SELECT * FROM users; 가 된다. 쿼리문 조합기
    return obj;
  }
}
