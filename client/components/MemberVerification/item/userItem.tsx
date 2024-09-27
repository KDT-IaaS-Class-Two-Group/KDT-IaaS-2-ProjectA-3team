import * as style from 'client/styles/pending/pending_component.css';

interface UserItemProps {
  item: { [key: string]: any };
  index: number;
  onApprove: (index: number, item: { [key: string]: any }) => void;
  onCancel: (index: number, item: { [key: string]: any }) => void;
  onInputChange: (index: number, field: string, value: any) => void;
  roles: { value: string; label: string }[]; // 권한 목록
  fields: { value: string; label: string }[]; // 분야 목록
}

const UserItem: React.FC<UserItemProps> = ({ item, index, onApprove, onCancel, onInputChange, roles, fields }) => {
  return (
    <div className={style.contentWrapper}>
      <h1>{index + 1}</h1>
      {Object.entries(item).map(([key, value]) => (
        <div key={key} className={style.content}>
          <p>
            {key}: {value}
          </p>
        </div>
      ))}

      {/* 월급 입력 필드 */}
      <div>
        <label htmlFor={`salary-${index}`}>월급: </label>
        <input
          type="number"
          id={`salary-${index}`}
          placeholder="월급"
          value={item.salary || ""}
          onChange={(e) => onInputChange(index, 'salary', e.target.value)}
        />
      </div>

      {/* 권한 선택 필드 */}
      <div>
        <label htmlFor={`role-${index}`}>권한: </label>
        <select
          id={`role-${index}`}
          value={item.role_name || ""}
          onChange={(e) => onInputChange(index, 'role_name', e.target.value)}
        >
          <option value="">권한 선택</option>
          {roles.map((role, i) => (
            <option key={i} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </div>

      {/* 분야 선택 필드 */}
      <div>
        <label htmlFor={`field-${index}`}>분야: </label>
        <select
          id={`field-${index}`}
          value={item.field_name || ""}
          onChange={(e) => onInputChange(index, 'field_name', e.target.value)}
        >
          <option value="">분야 선택</option>
          {fields.map((field) => (
            <option key={field.value} value={field.value}>
              {field.label}
            </option>
          ))}
        </select>
      </div>

      <button onClick={() => onApprove(index, item)}>승인</button>
      <button onClick={() => onCancel(index, item)}>취소</button>
    </div>
  );
};

// 수정된 부분: 중복된 default export 제거
export default UserItem;
