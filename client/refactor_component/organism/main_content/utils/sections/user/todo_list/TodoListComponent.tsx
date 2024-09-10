import React, { useState, useEffect } from 'react';

const TodoListComponent = ({ issueId }: { issueId: string }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

  const [newTodo, setNewTodo] = useState('');
  interface Todo {
    todo_id: string;
    description: string;
    isComplete: boolean;
  }
  
  useEffect(() => {
    // 이슈 ID로 TODO 리스트를 가져오는 API 호출
    const fetchTodos = async () => {
      const response = await fetch(`/todos/${issueId}`);
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, [issueId]);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    const response = await fetch(`/todos/${issueId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: newTodo }),
    });
    const addedTodo = await response.json();
    setTodos([...todos, addedTodo]);
    setNewTodo('');
  };

  const handleCompleteTodo = async (todoId: string) => {
    await fetch(`/todos/${todoId}/complete`, { method: 'PATCH' });
    setTodos(todos.map(todo => todo.todo_id === todoId ? { ...todo, isComplete: true } : todo));
  };

  return (
    <div>
      <h3>TODO List for Issue: {issueId}</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.todo_id}>
            {todo.description} - {todo.isComplete ? 'Completed' : 'Pending'}
            <button onClick={() => handleCompleteTodo(todo.todo_id)}>Complete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={handleAddTodo}>Add Task</button>
    </div>
  );
};

export default TodoListComponent;
