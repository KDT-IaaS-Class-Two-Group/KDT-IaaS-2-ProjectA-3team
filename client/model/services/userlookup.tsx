import { useEffect, useState } from "react";
import { User, Field, UserLookupProps } from "./userlookupmodule/usertypes";
import { handleInputChange } from "./userlookupmodule/handleInputChange";
import { fetchUsers } from "./userlookupmodule/fetchUsers";
import Button from "../../refactor_component/atom/button/button"; // 버튼 모듈 임포트
import Ul from "../../refactor_component/atom/ul/ul"; // ul 모듈 임포트
import Li from "../../refactor_component/atom/li/li"; // li 모듈 임포트
import FormField from "../../refactor_component/molecule/form_field/form_field"; // input과 label 모듈 임포트
import { greenButton } from "client/styles/templatebutton.css";
import {
  listinitial,
  pendingdiv,
  pendinglist,
  pendingmaindiv,
} from "client/styles/users/attendancestyle.css";

const UserLookup: React.FC<UserLookupProps> = ({ onSave }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<string[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const [usersData, fieldsData] = await fetchUsers();
        setUsers(usersData);
        setFields(fieldsData);
      } catch (error) {
        console.error("사용자 또는 필드 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleSave = () => {
    onSave(users);
  };

  const handleInputChangeWrapper = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field_name: keyof User
  ) => {
    handleInputChange(index, e, field_name, users, setUsers);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={pendingmaindiv}>
      <Ul ul_style={listinitial}>
        {users.map((user, index) => (
          <Li key={user.id} li_style={pendinglist}>
            이름 : {user.username}
            <FormField
              id={`salary-${index}`}
              label="월급 : "
              value={user.salary ? user.salary.toString() : ""}
              input_type="number"
              onChange={(e) => handleInputChangeWrapper(index, e, "salary")}
            />
            <div>
              <label htmlFor={`role-${index}`}>권한 : </label>
              <select
                id={`role-${index}`}
                value={user.role_name || ""}
                onChange={(e) =>
                  handleInputChangeWrapper(index, e, "role_name")
                }
              >
                <option value="admin">1</option>
                <option value="user">2</option>
                <option value="guest">3</option>
                <option value="editor">4</option>
              </select>
            </div>
            <div>
              <label htmlFor={`field-${index}`}>분야 : </label>
              <select
                id={`field-${index}`}
                value={user.field_name || ""}
                onChange={(e) =>
                  handleInputChangeWrapper(index, e, "field_name")
                }
              >
                {fields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
          </Li>
        ))}
      </Ul>
      <div className={pendingdiv}>
        <Button
          button_text="사용자 승인"
          button_style={greenButton}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default UserLookup;
