import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { TABLE_NAME } from 'src/api/common/enum/table/table.enum';
import { SERVICE_ERROR } from 'src/api/common/enum/message/error/serviceErrorMessage';
import { Stack } from '../../presentation/DTO/stack.dto';
import { RelationTeamUsers } from '../../presentation/DTO/relationTeamUsers.dto';
import { Project } from '../../domain/entities/project.entity';
/**
 * * Class : ProjectService
 * 작성자 : @naviadev / 2024-08-08
 * 편집자 : @naviadev / 2024-08-30
 * Issue :
 * @class ProjectService
 * @param private readonly queryBuilder: QueryBuilder
 * @description : 프로젝트 CRUD 처리 모델
 */
@Injectable()
export class ProjectRepository {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  /**
   * @param ProjectData : 프로젝트 도메인 객체.
   * @returns : bool타입 반환으로 성공 여부를 처리할 수 있도록 작성
   */

  async createProject(ProjectData: Project) {
    try {
      // VO에서 기본 데이터 타입으로 값을 추출합니다.
      const projectName = ProjectData.getProjectName().value;
      const projectStartDate = ProjectData.getProjectStartDate().value; // Date 객체 또는 string으로 변환
      const projectEndDate = ProjectData.getProjectEndDate().value; // Date 객체 또는 string으로 변환
      const teamName = ProjectData.getProjectTeamName().value;

      // 기본 데이터 타입으로 변환된 값들을 사용하여 쿼리를 실행
      await this.queryBuilder
        .INSERT(TABLE_NAME.__PROJECT, {
          project_name: projectName,
          project_start_date: projectStartDate,
          project_end_date: projectEndDate,
          team_name: teamName,
        })
        .execution();
      return true;
    } catch (error) {
      console.error(SERVICE_ERROR.__FAILURE_PROJECT_CREATE);
      return false;
    }
  }

  /**
   * @returns : 모든 프로젝트의 기본적인 데이터 (Project 테이블 레코드)값을 반환함.
   */
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

  /**
   *
   * @param project_name : 프로젝트 이름
   * @returns : 해당 프로젝트에 할당된 인원들을 객체 배열로 반환함.
   */
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

  /**
   *
   * @param stackData : 한번의 요청으로 n개의 스택 데이터가 포함될 수 있기에, [] 형태로 처리
   * @param project_name : 스택을 저장할 프로젝트의 이름
   */
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

  /**
   *
   * @param project_name : 프로젝트 이름
   * @returns : 프로젝트 이름을 통해 해당 프로젝트에 어떤 스택들이 할당되어있는 지 확인할 수 있음.
   */
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

  /**
   *
   * @param id : 회원 id
   * @returns : 해당 id에 할당된 프로젝트 리스트
   */
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
