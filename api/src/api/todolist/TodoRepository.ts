import { Injectable } from '@nestjs/common';

import { Todo } from './Todo.entity';

@Injectable()
export class TodoRepository {
  private todos: Todo[] = [];

  async getTodosForIssue(issue_id: string): Promise<Todo[]> {
    return this.todos.filter((todo) => todo.issue_id === issue_id);
  }

  async addTodoToIssue(issue_id: string, description: string): Promise<Todo> {
    const newTodo = Todo.create(issue_id, description);
    this.todos.push(newTodo);
    return newTodo;
  }

  async completeTodoTask(todo_id: string): Promise<void> {
    const todo = this.todos.find((todo) => todo.todo_id === todo_id);
    if (todo) {
      todo.completeTask();
    }
  }

  async deleteTodoTask(todo_id: string): Promise<void> {
    this.todos = this.todos.filter((todo) => todo.todo_id !== todo_id);
  }
}
