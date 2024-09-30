import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './TodoService';

@Controller('/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 특정 이슈에 관련된 할 일 목록 가져오기
  @Get('/:issue_id')
  async getTodos(@Param('issue_id') issue_id: string) {
    if (!issue_id) {
      throw new HttpException('Issue ID is required', HttpStatus.BAD_REQUEST);
    }

    const todos = await this.todoService.getTodos(issue_id);
    if (!todos || todos.length === 0) {
      throw new HttpException(
        'No todos found for this issue',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Todos retrieved successfully',
      data: todos,
    };
  }

  // 특정 이슈에 새로운 할 일 추가
  @Post('/:issue_id')
  async addTodo(
    @Param('issue_id') issue_id: string,
    @Body('description') description: string,
  ) {
    if (!issue_id || !description) {
      throw new HttpException(
        'Issue ID and description are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newTodo = await this.todoService.addTodo(issue_id, description);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Todo created successfully',
      data: newTodo,
    };
  }

  // 특정 할 일 완료 처리
  @Patch('/:todo_id/complete')
  async completeTodoTask(@Param('todo_id') todo_id: string) {
    if (!todo_id) {
      throw new HttpException('Todo ID is required', HttpStatus.BAD_REQUEST);
    }

    const updatedTodo = await this.todoService.completeTodo(todo_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Todo completed successfully',
      data: updatedTodo,
    };
  }

  // 특정 할 일 삭제
  @Delete('/:todo_id')
  async deleteTodoTask(@Param('todo_id') todo_id: string) {
    if (!todo_id) {
      throw new HttpException('Todo ID is required', HttpStatus.BAD_REQUEST);
    }

    const result = await this.todoService.deleteTodo(todo_id);

    // deleteTodo의 결과가 void일 가능성이 있으므로 추가 처리
    if (typeof result === 'undefined' || result === null) {
      throw new HttpException(
        'Todo not found or already deleted',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Todo deleted successfully',
    };
  }
}
