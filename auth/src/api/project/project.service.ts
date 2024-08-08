import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';
import { ProjectDTO } from './DTO/Project.DTO';

@Injectable()
/**
 * * Class : ProjectService
 * 작성자 : @naviadev / 2024-08-08
 * 편집자 : @naviadev / 2024-08-08
 * Issue :
 * @class ProjectService
 * @param private readonly queryBuilder: QueryBuilder
 * @description : 프로젝트 CRUD 처리 모델
 */
export class ProjectService {
  constructor(private readonly queryBuilder: QueryBuilder) {}
  async createProject(ProjectData: ProjectDTO) {
    try {
      await this.queryBuilder.INSERT('project', ProjectData).execution();
      return true;
    } catch (error) {
      console.error('CreateProject Failed');
      return false;
    }
  }

  async getProjectList() {
    try {
      const projectData = await this.queryBuilder.SELECT('project').execution();
      return projectData;
    } catch (error) {
      throw error;
    }
  }
}
