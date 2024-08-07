import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';
import { ProjectDTO } from '../DTO/Project.DTO';
@Injectable()
export class ProjectCreateService {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  test() {
    console.log('');
  }
  async createProject(ProjectData: ProjectDTO) {
    try {
      await this.queryBuilder.INSERT('project', ProjectData).execution();
      return true;
    } catch (error) {
      console.error('CreateProject Failed');
      return false;
    }
  }
}
