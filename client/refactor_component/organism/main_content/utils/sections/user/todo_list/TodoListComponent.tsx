import React, { useEffect, useState } from 'react';

interface TodoListComponentProps {
  issueId: string;  // issueId에 string 타입 명시
}

const TodoListComponent: React.FC<TodoListComponentProps> = ({ issueId }) => {
  const [todos, setTodos] = useState<any[]>([]);  // 할 일 목록 상태
  const [loading, setLoading] = useState<boolean>(true);  // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null);  // 오류 상태 관리
  const [newTodo, setNewTodo] = useState<string>('');  // 새로운 할 일 상태

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/${issueId}/todos`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setTodos(data);  // 배열일 경우에만 todos 설정
        } else {
          setError('Invalid data format. Expected an array.');
          setTodos([]);  // 배열이 아니면 빈 배열로 초기화
        }
        setLoading(false);  // 로딩 완료
      } catch (error) {
        console.error('ToDo 가져오기 실패:', error);
        setError('Failed to fetch todos.');
        setLoading(false);  // 로딩 실패 시에도 완료 처리
      }
    };

    if (issueId) {
      fetchTodos();  // issueId가 있으면 할 일 목록 가져오기
    }
  }, [issueId]);

  // 할 일 추가 함수 정의
  const handleAddTodo = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/${issueId}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newTodo }),  // 새로운 할 일 추가
      });

      if (response.ok) {
        const addedTodo = await response.json();
        setTodos((prevTodos) => [...prevTodos, addedTodo]);  // 추가된 할 일을 목록에 추가
        setNewTodo('');  // 입력 필드 초기화
      } else {
        console.error('Failed to add todo.');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // 로딩 중일 때
  if (loading) {
    return <div>Loading ToDo items...</div>;
  }

  // 오류 발생 시
  if (error) {
    return <div>{error}</div>;
  }

  // 할 일 목록이 비어있을 때
  if (todos.length === 0) {
    return <div>No ToDo items for this issue</div>;
  }

  // 할 일 목록 렌더링
  return (
    <div>
      <h3>ToDo List for Issue: {issueId}</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.todo_id}>
            {todo.description} - {todo.isComplete ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>

      {/* ToDo 추가 폼 */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <button onClick={handleAddTodo}>Add ToDo</button>
      </div>
    </div>
  );
};

export default TodoListComponent;
