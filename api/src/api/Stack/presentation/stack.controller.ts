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
import { stackDTO } from './DTO/stack.DTO';
import { CreateStackCommand } from '../application/command/createStack.command';
import { SearchStacksQuery } from '../application/query/searchStack.query';
import { DeleteStackCommand } from '../application/command/deleteStack.command';
import { STACK_HANDLER_ERROR } from '../Enum/HandlerError.enum';
import { STACK_RESPONSE_ERROR } from '../Enum/ResponseError.enum';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

/**
 * * Decorator : Controller
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @decorator Controller
 * @description : 스택 처리 엔드포인트.
 */
@Controller('/stack')
@ApiTags('Stack API')
export class Stackcontroller {
  constructor(
    private readonly commandHandler: StackCommandHandler,
    private readonly queryHandler: StackQueryHandler,
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: '새로운 스택 레코드를 생성할 수 있는 엔드포인트',
    description:
      'StackDTO 형태로 들어온 데이터를 Database에 추가하도록 라우팅한다.',
  })
  @ApiCreatedResponse({
    description: '성공적으로 처리 : 값은 반환하지 않는다.',
  })
  @ApiBody({ type: stackDTO, description: '스택 데이터' })
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
  @ApiOperation({
    summary: '스택 이름을 통해 레코드를 검색할 수 있는 엔드포인트',
    description: 'stack_name을 통해 스택을 검색한다.',
  })
  @ApiOkResponse({
    description: '검색 결과를 반환한다.',
  })
  @ApiNotFoundResponse({
    description: '스택을 찾을 수 없는 경우 404 응답을 반환한다..',
  })
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
  @ApiOperation({
    summary: '모든 스택을 조회할 수 있는 엔드포인트',
    description: '저장된 모든 스택 레코드를 조회한다.',
  })
  @ApiOkResponse({
    description: '스택 목록을 반환한다.',
  })
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
  @ApiOperation({
    summary: '스택을 삭제할 수 있는 엔드포인트',
    description: '스택 이름을 기준으로 스택을 삭제를 수행한다..',
  })
  @ApiOkResponse({
    description: '스택 삭제 성공.',
  })
  @ApiNotFoundResponse({
    description: '스택을 찾을 수 없는 경우 반환한다.',
  })
  async deleteStack(@Param('name') name: string): Promise<void> {
    await this.commandHandler.handleDeleteStack(new DeleteStackCommand(name));
  }
}
