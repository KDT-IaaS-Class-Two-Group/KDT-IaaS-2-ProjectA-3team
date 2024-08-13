import { Injectable } from '@nestjs/common';
import { IssueRepository } from 'src/api/issue/infrastructure/repository/issue.repository';
import { GetIssueQuery } from '../getIssue.query';

@Injectable()
export class IssueQueryHandler {
  constructor(private readonly issueRepository: IssueRepository) {}

  async getIssueHandler(getIssueQuery: GetIssueQuery) {
    return await this.issueRepository.getIssue(getIssueQuery.project_name);
  }
}
