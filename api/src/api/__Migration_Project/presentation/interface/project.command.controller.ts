import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ProjectDTO } from '../dto/project.dto';
import { CreateProjectCommand } from '../../application/command/project_create.command';
import { ProjectCommandHandler } from '../../application/command/handler/project_command.handler';
import { AddStackCommand } from '../../application/command/add_stack.command';
import { Stack } from '../DTO/stack.dto';

/**
 * * Class : ProjectCommandController
 * 작성자 : @naviadev / 2024-08-30
 * 편집자 : @naviadev / 2024-08-30
 * @class ProjectCommandController
 * @param private readonly commandHandler: ProjectCommandHandler => 명령 핸들러.
 * @description : project 의 쓰기 작업을 처리하는 컨트롤러
 */
@Controller('/project')
export class ProjectCommandController {
  constructor(private readonly commandHandler: ProjectCommandHandler) {}

  @Post('/create')
  async projectCreate(@Body() data: ProjectDTO) {
    try {
      // DTO를 Command 객체로 변환
      const command = CreateProjectCommand.DtoToCreateProjectCommand(data);
      // Command를 실행하여 프로젝트 생성
      const result = await this.commandHandler.createProjectExecute(command);
      // 성공적인 응답을 반환
      if (result) {
        return { message: 'Project created successfully' };
      } else {
        throw new HttpException(
          '프로젝트 생성 실패',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      // 에러 처리
      if (error instanceof HttpException) {
        throw error;
      }

      // 예상치 못한 오류를 처리
      throw new HttpException(
        '프로젝트 생성 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/save/stack/:id')
  async addStack(@Body() data: Stack[], @Param('id') id: string) {
    const command = AddStackCommand.createAddStackCommand(data, id);
    this.commandHandler.addStackExecute(command);
  }
}
