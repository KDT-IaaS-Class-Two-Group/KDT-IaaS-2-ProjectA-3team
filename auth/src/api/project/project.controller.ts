import {
  Body,
  Controller,
  Post,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ProjectCreateService } from './create/project_create.service';
import { ProjectDTO } from './DTO/Project.DTO';
@Controller('/project')
export class ProjectController {
  constructor(private readonly projectCreateService: ProjectCreateService) {}

  // [ ] 권한 확인 추가.
  @Post('/create`')
  @HttpCode(200)
  async projectCreate(
    @Body() projectData: ProjectDTO,
    // @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.projectCreateService.createProject(projectData);
    if (result) {
      return res.json({ message: 'Create Success' });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Create Failed' });
    }
  }
}
