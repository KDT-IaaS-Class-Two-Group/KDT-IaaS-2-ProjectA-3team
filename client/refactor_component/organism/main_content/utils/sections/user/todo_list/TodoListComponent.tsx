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

  // 할 일을 완료 처리하는 함수
// 할 일을 완료 처리하는 함수
const handleCompleteTodo = async (todoId: string) => {
  try {
    const response = await fetch(`http://localhost:3001/user/todos/${todoId}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // todos 상태를 직접 업데이트하여 불필요한 GET 요청을 줄임
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === todoId ? { ...todo, isComplete: true } : todo
        )
      );
    } else {
      console.error('Failed to complete todo.');
    }
  } catch (error) {
    console.error('Error completing todo:', error);
  }
};



// 할 일을 삭제하는 함수
const handleDeleteTodo = async (todoId: string) => {
  try {
    const response = await fetch(`http://localhost:3001/user/todos/${todoId}`, { // 경로 수정
      method: 'DELETE',
    });

    if (response.ok) {
      fetchTodos(); // 삭제 후 최신 목록 다시 불러오기
    } else {
      console.error('Failed to delete todo.');
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
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
            {!todo.isComplete && (
              <button onClick={() => handleCompleteTodo(todo.todo_id)}>Complete</button>
            )}
            <button onClick={() => handleDeleteTodo(todo.todo_id)}>Delete</button>
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
