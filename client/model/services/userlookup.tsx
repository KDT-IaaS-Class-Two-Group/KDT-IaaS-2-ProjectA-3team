import { useEffect, useState } from "react";

export interface User {
  id: string;
  username: string;
  salary?: number;
  role_name?: string;
  field_name?: string;
}
interface Field {
  field_name: string;
}
interface UserLookupProps {
  onSave: (users: User[]) => Promise<void>;
}

const UserLookup: React.FC<UserLookupProps> = ({ onSave }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<string[]>([]); // 추가된 상태

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [userResponse, fieldResponse] = await Promise.all([
          fetch("http://localhost:3001/getUser/all"),
          fetch("http://localhost:3001/getUser/fields"), // field 데이터 가져오기
        ]);

        if (!userResponse.ok || !fieldResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }

        const usersData = await userResponse.json();
        const fieldsData = await fieldResponse.json();
        setUsers(usersData);
        setFields(fieldsData.map((field: Field) => field.field_name)); // 필드명만 추출
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
                {fields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option> // 동적 필드 옵션
                ))}
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
