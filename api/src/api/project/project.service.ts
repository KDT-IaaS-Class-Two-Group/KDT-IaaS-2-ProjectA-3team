import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';
import { ProjectDTO } from './DTO/Project.DTO';
import { TABLE_NAME } from '../common/enum/table/table.enum';
import { SERVICE_ERROR } from '../common/enum/message/error/serviceErrorMessage';

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
      await this.queryBuilder
        .INSERT(TABLE_NAME.__PROJECT, ProjectData)
        .execution();
      return true;
    } catch (error) {
      console.error(SERVICE_ERROR.__FAILURE_PROJECT_CREATE);
      return false;
    }
  }

  async getProjectList() {
    try {
      const projectData = await this.queryBuilder
        .SELECT(TABLE_NAME.__PROJECT)
        .execution();
      return projectData;
    } catch (error) {
      throw error;
    }
  }

  async searchProjectMemeberData(project_name: string) {
    try {
      const result = await this.queryBuilder
        .SELECT(TABLE_NAME.__USERS)
        .JOIN(
          TABLE_NAME.__RELATION_TEAM_USERS,
          `${TABLE_NAME.__USERS}.user_id = ${TABLE_NAME.__RELATION_TEAM_USERS}.user_id`,
        )
        .JOIN(
          TABLE_NAME.__PROJECT,
          `${TABLE_NAME.__RELATION_TEAM_USERS}.team_name = ${TABLE_NAME.__PROJECT}.team_name`,
        )
        .WHERE(`${TABLE_NAME.__PROJECT}.project_name = $1`, [project_name])
        .execution();
      return result;
    } catch (error) {
      throw new Error(`${SERVICE_ERROR.__FAILURE_SEARCH_ERROR} : ${error}`);
    }
  }
}
