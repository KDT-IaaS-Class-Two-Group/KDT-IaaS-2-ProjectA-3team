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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserLookup;
