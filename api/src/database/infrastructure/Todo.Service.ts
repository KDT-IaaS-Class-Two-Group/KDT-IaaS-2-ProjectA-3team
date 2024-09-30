import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  async completeTodo(todo_id: string): Promise<any> {
    // 여기에 todo_id로 할 일을 완료하는 로직을 구현합니다.
    // 예: 데이터베이스에서 `todo_id`를 찾아서 완료 상태로 업데이트하는 로직.
    console.log(`Marking todo ${todo_id} as complete`);
    return { todo_id, status: 'completed' }; // 예시 리턴 값
  }
}
