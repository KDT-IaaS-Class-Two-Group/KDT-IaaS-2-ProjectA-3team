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
import { ApiOperation } from '@nestjs/swagger';

@Controller('/project')
export class ProjectQueryController {
  constructor(private readonly queryHandler: ProjectQueryHandler) {}

  @Get('list')
  @ApiOperation({
    summary: '프로젝트 리스트 출력 엔드포인트',
    description: '모든 프로젝트에 대한 데이터를 반환한다.',
  })
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

  @ApiOperation({
    summary: '프로젝트 팀 데이터 확인 엔드포인트',
    description:
      '프로젝트에 할당된 팀원들의 세부 데이터를 반환하는 역할을 수행한다.',
  })
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
