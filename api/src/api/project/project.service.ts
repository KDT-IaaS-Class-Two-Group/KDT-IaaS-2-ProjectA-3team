import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/queryBuilder';
import { ProjectDTO } from './DTO/Project.DTO';
import { TABLE_NAME } from '../common/enum/table/table.enum';
import { SERVICE_ERROR } from '../common/enum/message/error/serviceErrorMessage';
import { Stack } from './DTO/StackDTO';
import { RelationTeamUsers } from './DTO/relation_team_project.DTO';

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
      throw new Error(
        `join 관련 에러 : ${SERVICE_ERROR.__FAILURE_SEARCH_ERROR} : ${error}`,
      );
    }
  }

  async saveProjectStack(stackData: Stack[], project_name: string) {
    stackData.map((stack) => {
      this.queryBuilder
        .INSERT('relation_project_stack', {
          project_name: project_name,
          stack_name: stack.stack_name,
        })
        .execution();
    });
  }

  async getProjectStack(project_name: string) {
    try {
      const result = await this.queryBuilder
        .SELECT('relation_project_stack')
        .WHERE(`project_name = $1`, [project_name])
        .execution();
      return result;
    } catch (error) {
      throw new Error(`스택 참조 에러 :${error}`);
    }
  }

  // [ ] Join을 통해 데이터 통합 .
  async getProjectDataById(id: string) {
    try {
      const result = await this.queryBuilder
        .SELECT('relation_team_users')
        .WHERE('user_id = $1', [id])
        .execution();
      return result;
    } catch (error) {
      throw new Error(`유효하지 않은 아이디 : ${error}`);
    }
  }

  async getProjectTeamData(team_name: RelationTeamUsers[]): Promise<any[]> {
    if (Array.isArray(team_name)) {
      try {
        // 모든 프로미스가 완료될 때까지 기다림
        const projectList = await Promise.all(
          team_name.map(async (value) => {
            const data = await this.queryBuilder
              .SELECT('project')
              .WHERE('team_name = $1', [value.team_name])
              .execution();

            console.log(data);
            return data;
          }),
        );

        return projectList;
      } catch (error) {
        throw new Error(`프로젝트 팀 데이터를 가져오는 중 오류 발생: ${error}`);
      }
    } else {
      throw new Error('팀 이름 데이터가 배열이 아닙니다.');
    }
  }
}
