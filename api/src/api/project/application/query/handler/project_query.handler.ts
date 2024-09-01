import { Injectable } from '@nestjs/common';
import { ProjectRepository } from 'src/api/__Migration_Project/infrastructure/repository/project.repository';
import { ProjectMemeberQuery } from '../Project_member.query';
import { ProjectDataByIdQuery } from '../project_data.query';

@Injectable()
export class ProjectQueryHandler {
  constructor(private readonly repository: ProjectRepository) {}
  async getProjectAllExecute() {
    const data = await this.repository.getProjectList();
    return data;
  }

  async getProjectMemberExecute(query: ProjectMemeberQuery) {
    return this.repository.searchProjectMemeberData(
      query.project_name.getValue(),
    );
  }

  async getProjectData(query: ProjectDataByIdQuery) {
    const result = await this.repository.getProjectDataById(query.user_id);
    const projectSearch = await this.repository.getProjectTeamData(result);
    return projectSearch;
  }
}
