import React, { useState, useEffect } from "react";

interface Column {
  column_name: string;
}

const App: React.FC = () => {
  const [innerContent, setInnerContent] = useState<Column[]>([]); // 서버에서 가져온 데이터
  const [users, setUsers] = useState<Record<string, string>>({}); // 사용자가 작성한 데이터
  const [submittedData, setSubmittedData] = useState<Record<string, string>>({}); // 제출된 데이터
  const [checkName, setCheckName] = useState<string>(""); // 이름 확인 입력값
  const [checkResult, setCheckResult] = useState<string>(""); // 이름 확인 결과
  const [userId, setUserId] = useState<number | null>(null); // 사용자 ID
  const [field, setField] = useState<string>(""); // field 값

  // 데이터베이스에서 유저 목록을 가져오는 함수
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setInnerContent(data);
      })
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
      .then((data) => {
        console.log(data.message);
        setSubmittedData(users);
      })
      .catch((error) => {
        console.error("send fetch error", error);
      });
  };

  // 서버에서 name 값을 조회하는 함수
  const checkNameExists = () => {
    fetch(`http://localhost:3001/check-name/${checkName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          setCheckResult("사용자가 맞습니다");
          setUserId(data.userId); // 사용자 ID 저장
        } else {
          setCheckResult("사용자가 아닙니다");
          setUserId(null); // 사용자 ID 초기화
        }
      })
      .catch((error) => {
        console.error("checkName fetch error", error);
      });
  };

  // 서버에 field 값을 전송하는 함수
  const addField = () => {
    if (userId !== null) {
      fetch("http://localhost:3001/add-field", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, field: parseInt(field, 10) }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setField(""); // 입력 필드 초기화
        })
        .catch((error) => {
          console.error("addField fetch error", error);
        });
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
      <button onClick={send}>Submit</button>

      {/* 제출된 데이터를 테이블로 출력하는 부분 */}
      {Object.keys(submittedData).length > 0 && (
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
                <td key={column.column_name}>{submittedData[column.column_name]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}

      {/* 이름 확인 입력 필드와 결과 출력 */}
      <div>
        <input
          type="text"
          placeholder="Enter name to check"
          value={checkName}
          onChange={(e) => setCheckName(e.target.value)}
        />
        <button onClick={checkNameExists}>Check Name</button>
        {checkResult && <p>{checkResult}</p>}
      </div>

      {/* field 입력 필드 및 버튼 */}
      {userId !== null && (
        <div>
          <input
            type="number"
            placeholder="Enter field value"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
          <button onClick={addField}>Add Field</button>
        </div>
      )}
    </div>
  );
};

export default App;
