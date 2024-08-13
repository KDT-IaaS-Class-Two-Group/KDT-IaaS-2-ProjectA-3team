import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { IssueQueryHandler } from '../application/query/handler/issue.query.service';
import { GetIssueQuery } from '../application/query/getIssue.query';
import { ISSUE_REPONSE_ERROR } from '../enum/error/ISSUE_RESPONSE_ERROR.enum';

@Controller('/issue')
export class IssueQueryController {
  constructor(private readonly queryHandler: IssueQueryHandler) {}
  @Get('/:id')
  async GetIssue(@Param('id') project_name: string) {
    try {
      const query = new GetIssueQuery(project_name);
      const result = await this.queryHandler.getIssueHandler(query);
      return result;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        ISSUE_REPONSE_ERROR.__FAILED_SET_USER,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
