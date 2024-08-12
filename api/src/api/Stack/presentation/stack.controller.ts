import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  HttpCode,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StackCommandHandler } from '../application/command/handler/stack.command.service';
import { StackQueryHandler } from '../application/query/handler/stack.query.service';
import { stackDTO } from './DTO /stack.DTO';
import { CreateStackCommand } from '../application/command/createStack.command';
import { SearchStacksQuery } from '../application/query/searchStack.query';
import { DeleteStackCommand } from '../application/command/deleteStack.command';
import { STACK_HANDLER_ERROR } from '../Enum/HandlerError.enum';
import { STACK_RESPONSE_ERROR } from '../Enum/ResponseError.enum';

/**
 * * Decorator : Controller
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @decorator Controller
 * @description : 스택 처리 엔드포인트.
 */
@Controller('/stack')
export class Stackcontroller {
  constructor(
    private readonly commandHandler: StackCommandHandler,
    private readonly queryHandler: StackQueryHandler,
  ) {}

  @Post()
  @HttpCode(200)
  async createStack(@Body() body: stackDTO) {
    try {
      const { stack_name, stack_type } = body;
      const command = new CreateStackCommand(stack_name, stack_type);
      await this.commandHandler.handleCreateStack(command);
      return;
    } catch (error) {
      console.error(STACK_HANDLER_ERROR.__FAILED_CREATE, error);
      throw new HttpException(
        STACK_RESPONSE_ERROR.__FAILED_CREATE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/search/:name')
  @HttpCode(200)
  async getSearchStack(@Param('name') id: string) {
    try {
      const result = await this.queryHandler.handleSearchStacks(
        new SearchStacksQuery(id),
      );
      return result;
    } catch (error) {
      console.error(STACK_HANDLER_ERROR.__FAILED_SEARCH_STACK, error);
      throw new HttpException(
        STACK_RESPONSE_ERROR.__FAILED_SEARCH,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('/search')
  @HttpCode(200)
  async getAllStack() {
    try {
      const result = await this.queryHandler.handleGetAllStacks();
      return result;
    } catch (error) {
      console.error(STACK_HANDLER_ERROR.__FAILED_SEARCH_ALL, error);
      throw new HttpException(
        STACK_RESPONSE_ERROR.__FAILED_SEARCH,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':name')
  @HttpCode(204)
  async deleteStack(@Param('name') name: string): Promise<void> {
    await this.commandHandler.handleDeleteStack(new DeleteStackCommand(name));
  }
}
