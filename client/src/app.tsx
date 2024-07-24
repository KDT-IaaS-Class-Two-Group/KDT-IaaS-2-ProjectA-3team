import React, { useState, useEffect } from "react";


interface Column {
  //오류 부분
  column_name: string;
}

const App: React.FC = () => {
  const [innerContent, setInnerContent] = useState<Column[]>([]); // 서버에서 가져온 데이터
  const [users, setUsers] = useState<Record<string,string>>({}); // 사용자가 작성한 데이터
  
  // 데이터베이스에서 유저 목록을 가져오는 함수
  useEffect(() => {
    fetch("http://localhost:3001/users")
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      console.log("Fetched data:", data);
      setInnerContent(data)
    })
    .catch((error)=>console.error('Error fetching users',error))
  }, []);  
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value}=event.target;
    setUsers((prev)=> ({
      ...prev,
      [name]: value
    }));
  };

  // 서버에 데이터 전송 함수
  const send = () => {
    fetch('http://localhost:3001/send',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(users)
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch((error) => {
      console.error('send fetch error', error)
    })
  };


  return (
    <div>
      <h1>Users</h1>
      {innerContent.map((column) => (
        <div key={column.column_name}>
        <label>
        {column.column_name}
        </label>
          <input type="text" name={column.column_name} value={users[column.column_name] || ''} onChange={handleChange}/>
        </div>
      ))} 
      <button onClick={send}>gg</button>
    </div>
  );
};

export default App;
