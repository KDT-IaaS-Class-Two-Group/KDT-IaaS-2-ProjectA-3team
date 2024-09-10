export class Todo {
  constructor(
    public readonly todo_id: string,
    public readonly issue_id: string, // 이슈와 연결
    public description: string,
    public isComplete: boolean, // 완료 여부
  ) {}

  static create(issue_id: string, description: string): Todo {
    return new Todo(
      Math.random().toString(36).substr(2, 9), // 랜덤 ID 생성
      issue_id,
      description,
      false, // 처음에는 미완료 상태로 생성
    );
  }

  completeTask() {
    this.isComplete = true;
  }

  uncompleteTask() {
    this.isComplete = false;
  }
}
