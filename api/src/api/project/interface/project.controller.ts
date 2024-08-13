import {
  Body,
  Controller,
  Post,
  Res,
  HttpCode,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { ProjectService } from '../project.service';
import { ProjectDTO } from '../DTO/Project.DTO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/project')
@ApiTags('Project API')
/**
 * * Class : ProjectController
 * 작성자 : @naviadev / 2024-08-08
 * 편집자 : @naviadev / 2024-08-08
 * Issue :
 * @class ProjectController
 * @param private readonly projectService: ProjectService
 * @description : 프로젝트에 관련한 CRUD를 처리하는 컨트롤러.
 */
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // [ ] 권한 확인 추가. (req.session.user를 통해 세션 키 확인.)
  @Post('/create')
  @ApiOperation({
    summary: '프로젝트 생성 엔드포인트',
    description: '요청된 프로젝트를 생성하는 엔드포인트.',
  })
  @HttpCode(200)
  async projectCreate(@Body() projectData: ProjectDTO, @Res() res: Response) {
    try {
      const result = await this.projectService.createProject(projectData);
      if (result) {
        return res.json({ message: 'Create Success' });
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Create Failed' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '프로젝트 리스트 출력 엔드포인트',
    description: '모든 프로젝트에 대한 데이터를 반환한다.',
  })
  async findProjectAll(@Res() response: Response) {
    try {
      const data = await this.projectService.getProjectList();

      return response.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.error(error);
      response.status(HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('/getTeamMember/:id')
  @HttpCode(200)
  @ApiOperation({
    summary: '프로젝트 팀 데이터 확인 엔드포인트',
    description:
      '프로젝트에 할당된 팀원들의 세부 데이터를 반환하는 역할을 수행한다.',
  })
  async getTeamData(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.projectService.searchProjectMemeberData(id);
      const transformedResult = result.map((member) => ({
        user_id: member.user_id,
        username: member.username,
        email: member.email,
        team_name: member.team_name,
        role_name: member.role_name,
      }));

      const projectStack = await this.projectService.getProjectStack(id);

      return res.json({ member: transformedResult, stack: projectStack });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('/save/stack/:id')
  async addStack(@Body() data, @Param() id) {
    this.projectService.saveProjectStack(data, id.id);
  }

  @Get('/check/:id')
  async getProjectData(@Param('id') id) {
    const result = await this.projectService.getProjectDataById(id);
    // [ ] 해당 데이터를 기반으로 프로젝트 조회를 진행.
    const projectSearch = await this.projectService.getProjectTeamData(result);
    return projectSearch;
  }
}
