import { Controller, Get, Post } from '@nestjs/common';

import { QueryBuilder } from 'src/database/queryBuilder';
@Controller('/getUser')
export class UsersController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  @Get('/all')
  async CheckUser() {
    const obj = this.queryBuilder.SELECT(['*'], 'users').execution();
    // -> SELECT * FROM users; 가 된다. 쿼리문 조합기
    return obj;
  }
  @Post('/all')
  async CheckUserPost() {
    const obj = this.queryBuilder.SELECT(['*'], 'users').execution();
    return obj;
  }
}
