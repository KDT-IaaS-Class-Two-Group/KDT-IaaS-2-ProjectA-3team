import { useEffect, useState } from "react";
import {
  User,
  UserLookupProps,
} from "../../organism/user_lookup/props/user.props";
import { handleInputChange } from "../../organism/user_lookup/utils/handle_input_change";
import { fetchUsers } from "../../organism/user_lookup/service/fetch_users";
import { fetchRoles } from "client/refactor_component/organism/user_lookup/service/fetch_roles"; // roles 데이터 가져오는 함수
import Button from "../../atom/button/button";
import Ul from "../../atom/ul/ul";
import Li from "../../atom/li/li";
import FormField from "../../molecule/form_field/form_field";
import Select from "../../atom/select/select"; // Select 컴포넌트 import
import { greenButton } from "client/styles/templatebutton.css";
import {
  listinitial,
  pendingdiv,
  pendinglist,
  pendingmaindiv,
} from "client/styles/users/attendancestyle.css";

/**
 * @brief 사용자 정보를 조회하고 수정할 수 있는 컴포넌트입니다.
 *
 * 이 컴포넌트는 사용자의 목록과 필드를 비동기적으로 불러와서 화면에 표시합니다. 사용자는
 * 각 사용자에 대해 월급, 권한, 분야를 수정할 수 있으며, 수정된 정보를 저장할 수 있습니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 *
 * @param {UserLookupProps} props - 컴포넌트의 props로 `onSave` 콜백 함수를 포함합니다.
 * @returns React.FC 이 컴포넌트는 React 함수형 컴포넌트입니다.
 */
const UserLookup: React.FC<UserLookupProps> = ({ onSave }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<string[]>([]);
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]); // roles 상태 추가

  useEffect(() => {
    /**
     * 사용자, 필드, 그리고 역할 데이터를 비동기적으로 불러오는 함수입니다.
     */
    const loadUsersAndRoles = async () => {
      try {
        const [usersData, fieldsData] = await fetchUsers(); // 사용자 및 필드 데이터 가져오기
        const rolesData = await fetchRoles(); // 역할 데이터 가져오기

        setUsers(usersData);
        setFields(fieldsData);
        setRoles(rolesData); // 역할 데이터 저장
      } catch (error) {
        console.error("사용자 또는 필드 또는 역할 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsersAndRoles();
  }, []);

  /**
   * 사용자의 정보를 저장하는 함수입니다.
   *
   * 수정된 사용자 정보를 `onSave` 콜백 함수를 통해 상위 컴포넌트에 전달합니다.
   */
  const handleSave = () => {
    onSave(users);
  };

  /**
   * 입력 값 변경을 처리하는 래퍼 함수입니다.
   *
   * @param {number} index - 수정할 사용자 인덱스
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - 입력 이벤트
   * @param {keyof User} field_name - 수정할 사용자 필드 이름
   */
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
              placeholder={""}
            />
            <Select
              id={`role-${index}`}
              value={user.role_name || ""} // role_name을 기본 값으로 사용
              onChange={(e) => handleInputChangeWrapper(index, e, "role_name")}
              options={roles} // 동적으로 가져온 roles 사용
              label="권한 : "
            />
            <Select
              id={`field-${index}`}
              value={user.field_name || ""} // field_name을 기본 값으로 사용
              onChange={(e) => handleInputChangeWrapper(index, e, "field_name")}
              options={fields.map((field) => ({ value: field, label: field }))} // 필드 데이터를 options으로 변환
              label="분야 : "
            />
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
