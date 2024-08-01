import { useEffect, useState } from "react";

interface UserDTO {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

const UserLookup = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [error, setError] = useState<string | null>(null); // 오류 상태를 string으로 설정

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/all");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const resJson: UserDTO[] = await response.json(); // 명시적 타입 설정
        setUsers(resJson);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // 오류 메시지 설정
        } else {
          setError("Unknown error occurred"); // 알 수 없는 오류 처리
        }
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>사용자 조회</h1>
      {
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <strong>이름:</strong> {user.username}
              <br />
              <strong>생년월일:</strong> {user.birth_date}
              <br />
              <strong>주소:</strong> {user.address}
              <br />
              <strong>전화번호:</strong> {user.phone}
              <br />
              <strong>이메일:</strong> {user.email}
            </li>
          ))}
        </ul>
      }
      <button onClick={UserLookup}>조회하기</button>
    </div>
  );
};

export default UserLookup;
