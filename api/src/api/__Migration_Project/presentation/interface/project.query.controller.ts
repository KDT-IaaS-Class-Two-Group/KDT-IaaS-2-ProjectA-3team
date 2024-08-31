import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ProjectQueryHandler } from '../../application/query/handler/project_query.handler';
import { ProjectMemeberQuery } from '../../application/query/Project_member.query';
import { ProjectDataByIdQuery } from '../../application/query/project_data.query';

@Controller('/project')
export class ProjectQueryController {
  constructor(private readonly queryHandler: ProjectQueryHandler) {}

  async getProjectListAll() {
    try {
      const projectList = await this.queryHandler.getProjectAllExecute();
      return projectList;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        '프로젝트 조회 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('/getTeamMember/:id')
  async getTeamDatat(@Param('id') id: string) {
    const query = new ProjectMemeberQuery(id);
    try {
      const result = await this.queryHandler.getProjectMemberExecute(query);
      return result;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        '프로젝트 조회 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/check/:id')
  async getProjectData(@Param('id') id: string) {
    try {
      const query = new ProjectDataByIdQuery(id);
      const result = await this.queryHandler.getProjectData(query);
      return result;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        '프로젝트 조회 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
