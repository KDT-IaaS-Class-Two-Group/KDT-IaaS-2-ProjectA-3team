import React, { useEffect, useState } from 'react';

interface TodoListComponentProps {
  issueId: string;
}

const TodoListComponent: React.FC<TodoListComponentProps> = ({ issueId }) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<string>('');

  // 서버로부터 할 일 목록 가져오기
  const fetchTodos = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/${issueId}/todos`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        setError('Invalid data format. Expected an array.');
        setTodos([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('ToDo 가져오기 실패:', error);
      setError('Failed to fetch todos.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (issueId) {
      fetchTodos();
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
        body: JSON.stringify({ description: newTodo }),
      });

      if (response.ok) {
        setNewTodo(''); // 입력 필드 초기화
        fetchTodos(); // 할 일 추가 후 최신 목록을 다시 불러옴
      } else {
        console.error('Failed to add todo.');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  if (loading) {
    return <div>Loading ToDo items...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (todos.length === 0) {
    return <div>No ToDo items for this issue</div>;
  }

  return (
    <div>
      <h3>ToDo List for Issue: {issueId}</h3>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.todo_id || `temp-${index}`}>
            {todo.description} - {todo.isComplete ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>

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
