import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState<{ id: number; input_data: string }[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        fetchData();  // 데이터 저장 후 데이터를 다시 불러옵니다.
      } else {
        console.error('Server error:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/data');
      const result = await response.json();
      console.log('Fetched data:', result);
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error('Fetched data is not an array:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();  // 컴포넌트가 마운트될 때 데이터를 불러옵니다.
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="왜 입력 해야 될까?"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">전송</button>
      </form>
      <div>
        <h2>입력값:</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.input_data}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
