import { Injectable } from '@nestjs/common';
import { TodoRepository } from './TodoRepository';
import { Todo } from './Todo.entity';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async getTodos(issue_id: string): Promise<Todo[]> {
    return this.todoRepository.getTodosForIssue(issue_id);
  }

  async addTodo(issue_id: string, description: string): Promise<Todo> {
    return this.todoRepository.addTodoToIssue(issue_id, description);
  }

  async completeTodo(todo_id: string): Promise<void> {
    return this.todoRepository.completeTodoTask(todo_id);
  }

  async deleteTodo(todo_id: string): Promise<void> {
    return this.todoRepository.deleteTodoTask(todo_id);
  }
}
