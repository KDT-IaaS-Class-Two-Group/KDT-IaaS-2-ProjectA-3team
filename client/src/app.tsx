import React, { useState, useEffect } from "react";

interface Column {
  column_name: string;
}

const App: React.FC = () => {
  const [innerContent, setInnerContent] = useState<Column[]>([]); // 서버에서 가져온 데이터
  const [users, setUsers] = useState<Record<string, string>>({}); // 사용자가 작성한 데이터
  const [isTableVisible, setIsTableVisible] = useState(false); // '여기가 바뀜' 테이블 표시 여부 상태 추가
  const [nameToCheck, setNameToCheck] = useState(""); // '여기가 바뀜' 확인할 이름 입력 상태 추가
  const [validationMessage, setValidationMessage] = useState(""); // '여기가 바뀜' 검증 결과 메시지 상태 추가

  // 데이터베이스에서 유저 목록을 가져오는 함수
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => setInnerContent(data))
      .catch((error) => console.error("Error fetching users", error));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUsers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 서버에 데이터 전송 함수
  const send = () => {
    fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((response) => response.json())
      .then(() => {
        setIsTableVisible(true); // '여기가 바뀜' 테이블을 표시
      })
      .catch((error) => {
        console.error("send fetch error", error);
      });
  };

  // 이름 확인 함수 '여기가 바뀜'
  const checkName = () => {
    if (users.name === nameToCheck) {
      setValidationMessage("사용자가 맞습니다");
    } else {
      setValidationMessage("사용자가 아닙니다");
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {innerContent.map((column) => (
        <div key={column.column_name}>
          <label>{column.column_name}</label>
          <input
            type="text"
            name={column.column_name}
            value={users[column.column_name] || ""}
            onChange={handleChange}
          />
        </div>
      ))}
      <button onClick={send}>gg</button>
      {isTableVisible && (
        <div>
          <h2>테이블</h2>
          <table>
            <thead>
              <tr>
                {innerContent.map((column) => (
                  <th key={column.column_name}>{column.column_name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {innerContent.map((column) => (
                  <td key={column.column_name}>
                    {users[column.column_name]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div>
            <input
              type="text"
              value={nameToCheck}
              onChange={(e) => setNameToCheck(e.target.value)}
              placeholder="이름을 입력하세요"
            />
            <button onClick={checkName}>확인</button>
            {validationMessage && <p>{validationMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
