import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { TABLE_NAME } from 'src/api/common/enum/table/table.enum';
import { Issue } from '../../domain/entites/issue.entity';

/**
 * * Decorator : Injectable
 * 작성자 : @naviadev / 2024-08-13
 * 편집자 : @naviadev / 2024-08-13
 * Issue :
 * @decorator Injectable
 * @description : Persistence Layer로, Issue와 연관된 데이터를 읽고 쓰는 역할을 수행한다.
 */
@Injectable()
export class IssueRepository {
  constructor(private readonly qb: QueryBuilder) {}

  async createIssue(issue: Issue): Promise<void> {
    console.log('Inserting issue with user_id:', issue.getUserId()); // user_id 확인
    await this.qb
      .INSERT(TABLE_NAME.__ISSUE, {
        issue_name: issue.getIssueName(),
        status: issue.getStatus(),
        project_name: issue.getProjectName(),
        user_id: issue.getUserId() || null, // user_id가 null인 경우 처리
      })
      .execution();
  }

  async deleteIssue(issue_id: string): Promise<void> {
    await this.qb
      .DELETE(TABLE_NAME.__ISSUE, 'issue_id = $1', [issue_id])
      .execution();
  }

  async setStatus(issue_id: string, status: string): Promise<void> {
    await this.qb
      .UPDATE(TABLE_NAME.__ISSUE, { status }, 'issue_id = $1')
      .ADD_PARAM(issue_id)
      .execution();
  }

  async setUser(issue_id: string, user_id: string): Promise<void> {
    await this.qb
      .UPDATE(TABLE_NAME.__ISSUE, { user_id }, 'issue_id = $1')
      .ADD_PARAM(issue_id)
      .execution();
  }

  async getIssue(project_name: string): Promise<Issue[]> {
    const rows = await this.qb
      .SELECT(TABLE_NAME.__ISSUE)
      .WHERE('project_name ILIKE $1', [`%${project_name}%`])
      .execution();

    console.log('Fetched rows:', rows); // 데이터 확인용 로그

    return rows.map((row) =>
      Issue.create(
        row.issue_id,
        row.issue_name,
        row.status,
        row.project_name,
        row.user_id,
      ),
    );
  }

  async getIssueAll() {
    const rows = await this.qb.SELECT(TABLE_NAME.__ISSUE).execution();
    return rows;
  }
}
