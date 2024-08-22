import { Injectable } from '@nestjs/common';
import { IssueRepository } from 'src/api/issue/infrastructure/repository/issue.repository';
import { CreateIssueCommand } from '../createIssue.command';
import { Issue } from 'src/api/issue/domain/entites/issue.entity';
import { DeleteIssueCommand } from '../deleteIssue.command';
import { SetStatusCommand } from '../setStatus.command';
import { SetUserCommand } from '../setUser.commnad';

@Injectable()
export class IssueCommandHandler {
  constructor(private readonly issueRepository: IssueRepository) {}

  async handleCreateIssue(command: CreateIssueCommand): Promise<void> {
    const { issue_name, project_name } = command;
    const issue: Issue = Issue.create(
      undefined,
      issue_name,
      '대기',
      project_name,
      null, // 할당된 사람 없음
    );
    this.issueRepository.createIssue(issue);
  }

  async handleDeleteIssue(command: DeleteIssueCommand): Promise<void> {
    const { issue_id } = command;
    this.issueRepository.deleteIssue(issue_id);
  }

  async handleUpdateStatus(command: SetStatusCommand): Promise<void> {
    const { issue_id, status } = command;
    this.issueRepository.setStatus(issue_id, status);
  }

  async hadleSetUser(command: SetUserCommand): Promise<void> {
    const { issue_id, user_id } = command;
    this.issueRepository.setUser(issue_id, user_id);
  }
}
