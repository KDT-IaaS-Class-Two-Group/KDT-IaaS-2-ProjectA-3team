import { useEffect, useState } from "react";

interface User {
  username: string; // 사용자 이름만 필요한 경우
}

const UserLookup = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("사용자 조회 및 권한 부여");
      try {
        const response = await fetch("http://localhost:3001/getUser/all");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const resJson = await response.json();
        setUsers(resJson);
        console.log(resJson);
      } finally {
        setLoading(false);
        console.log(2222);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>사용자 조회</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>이름:</strong> {user.username}
            <div>
              <label htmlFor="salary">월급:</label>
              <input
                id="salary"
                type="number"
                name="salary"
                placeholder="월급을 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="role">권한:</label>
              <select id="role" name="role">
                <option value="admin">1</option>
                <option value="user">2</option>
                <option value="guest">3</option>
                <option value="editor">4</option>
              </select>
            </div>
            <div>
              <label htmlFor="field">분야:</label>
              <select id="field" name="field">
                <option value="front">frontdend egineer</option>
                <option value="back">backend egineer</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserLookup;
