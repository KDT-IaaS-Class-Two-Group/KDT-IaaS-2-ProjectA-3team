import { useEffect, useState } from "react";

export interface User {
  id: string; // 사용자 ID
  username: string;
  salary?: number;
  role_name?: string;
  field_name?: string;
}

interface UserLookupProps {
  onSave: (users: User[]) => Promise<void>;
}

const UserLookup: React.FC<UserLookupProps> = ({ onSave }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/getUser/all");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const resJson = await response.json();
        setUsers(resJson);
      } catch (error) {
        console.error("사용자 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field_name: keyof User,
  ) => {
    const value =
      field_name === "salary" ? Number(e.target.value) : e.target.value;
    const updatedUsers = users.map((u, i) =>
      i === index
        ? {
            ...u,
            [field_name]: value,
          }
        : u,
    );
    setUsers(updatedUsers);
  };

  const handleSave = () => {
    onSave(users);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>사용자 조회</h1>
      <ul>
        {users.map((user, index) => (
          <li key={user.id}>
            <strong>이름:</strong> {user.username}
            <div>
              <label htmlFor={`salary-${index}`}>월급:</label>
              <input
                id={`salary-${index}`}
                type="number"
                value={user.salary || ""}
                onChange={(e) => handleInputChange(index, e, "salary")}
                placeholder="월급을 입력하세요"
              />
            </div>
            <div>
              <label htmlFor={`role-${index}`}>권한:</label>
              <select
                id={`role-${index}`}
                value={user.role_name || ""}
                onChange={(e) => handleInputChange(index, e, "role_name")}
              >
                <option value="admin">1</option>
                <option value="user">2</option>
                <option value="guest">3</option>
                <option value="editor">4</option>
              </select>
            </div>
            <div>
              <label htmlFor={`field-${index}`}>분야:</label>
              <select
                id={`field-${index}`}
                value={user.field_name || ""}
                onChange={(e) => handleInputChange(index, e, "field_name")}
              >
                <option value="front">Frontend Engineer</option>
                <option value="back">Backend Engineer</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>저장하기</button>
    </div>
  );
};

export default UserLookup;
