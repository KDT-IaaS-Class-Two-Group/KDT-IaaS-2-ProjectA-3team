import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from './TodoService';

@Controller('/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/:issue_id')
  async getTodos(@Param('issue_id') issue_id: string) {
    return this.todoService.getTodos(issue_id);
  }

  @Post('/:issue_id')
  async addTodo(
    @Param('issue_id') issue_id: string,
    @Body('description') description: string,
  ) {
    return this.todoService.addTodo(issue_id, description);
  }

  @Patch('/:todo_id/complete')
  async completeTodoTask(@Param('todo_id') todo_id: string) {
    return this.todoService.completeTodo(todo_id);
  }

  @Delete('/:todo_id')
  async deleteTodoTask(@Param('todo_id') todo_id: string) {
    return this.todoService.deleteTodo(todo_id);
  }
}
