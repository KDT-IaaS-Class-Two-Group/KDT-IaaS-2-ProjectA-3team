import * as style from "client/styles/pending/pending_component.css";

// UserItem 타입 정의 (실제 데이터 구조에 맞게 수정 필요)
interface UserItem {
  id: string;
  name: string;
  role: string;
  salary: number;
  field: string;
}



interface UserItemProps {
  item: UserItem;
  index: number;
  onApprove: (index: number, item: UserItem) => void;
  onCancel: (index: number, item: UserItem) => void;
  onInputChange: (index: number, field: keyof UserItem, value: string | number) => void;
  roles: { value: string; label: string }[]; // 권한 목록
  fields: { value: string; label: string }[]; // 분야 목록
}

const UserItem: React.FC<UserItemProps> = ({
  item,
  index,
  onApprove,
  onCancel,
  onInputChange,
  roles,
  fields,
}) => {
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

      <div>
        <label htmlFor={`salary-${index}`}>월급: </label>
        <input
          type="number"
          id={`salary-${index}`}
          placeholder="월급"
          value={item.salary || ""}
          onChange={(e) => onInputChange(index, "salary", parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor={`role-${index}`}>권한: </label>
        <select
          id={`role-${index}`}
          value={item.role || ""}  
          onChange={(e) => onInputChange(index, "role", e.target.value)}
        >
          <option value="">권한 선택</option>
          {roles.map((role, i) => (
            <option key={i} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`field-${index}`}>분야: </label>
        <select
          id={`field-${index}`}
          value={item.field || ""}  
          onChange={(e) => onInputChange(index, "field", e.target.value)}
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

export default UserItem;
