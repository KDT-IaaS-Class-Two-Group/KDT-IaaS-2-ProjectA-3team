import {
  Controller,
  Delete,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { IssueCommandHandler } from '../application/command/handler/issue.command.service';
import { IssueDTO } from './DTO/issueDTO';
import { CreateIssueCommand } from '../application/command/createIssue.command';
import { ISSUE_REPONSE_ERROR } from '../enum/error/ISSUE_RESPONSE_ERROR.enum';
import { DeleteIssueCommand } from '../application/command/deleteIssue.command';
import { SetUserCommand } from '../application/command/setUser.commnad';
import { SetStatusCommand } from '../application/command/setStatus.command';

@Controller('/issue')
export class IssueCommandController {
  constructor(private readonly commandHandler: IssueCommandHandler) {}
  @Post('/create')
  @HttpCode(200)
  async CreateIssue(@Body() body: IssueDTO) {
    try {
      const { issue_name, project_name } = body;
      const command = new CreateIssueCommand(issue_name, project_name);
      this.commandHandler.handleCreateIssue(command);
      return;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        ISSUE_REPONSE_ERROR.__FAILED_CREATE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Delete('/delete')
  async DeleteIssue(@Body() issue_id: string) {
    try {
      const command = new DeleteIssueCommand(issue_id);
      this.commandHandler.handleDeleteIssue(command);
      return;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        ISSUE_REPONSE_ERROR.__FAILED_DELETE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Patch('/setUser')
  async setUser(@Body() data: { issue_id: string; user_id: string }) {
    try {
      const command = new SetUserCommand(data.issue_id, data.user_id);
      this.commandHandler.hadleSetUser(command);
      return;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        ISSUE_REPONSE_ERROR.__FAILED_SET_USER,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('/setUpdate')
  async setStatus(@Body() data: { issue_id: string; status: string }) {
    try {
      const command = new SetStatusCommand(data.issue_id, data.status);
      this.commandHandler.handleUpdateStatus(command);
      return;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        ISSUE_REPONSE_ERROR.__FAILED_SET_STATUS,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
