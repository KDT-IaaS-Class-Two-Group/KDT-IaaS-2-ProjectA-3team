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
import { ProjectService } from './project.service';
import { ProjectDTO } from './DTO/Project.DTO';

@Controller('/project')
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

      return res.json(transformedResult);
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED);
    }
  }
}
