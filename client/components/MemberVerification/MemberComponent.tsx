import React, { useState, useEffect } from 'react';
import * as style from 'client/styles/pending/pending_component.css';
import { approveHandler } from './services/approve/fetchApproveData';
import { cancelHandler } from './services/cancel/fetchCancelData';
import { usePendingUsers } from './hook/usePendingUser';
import UserItem from './item/userItem';

// UserItem 인터페이스 정의 (실제 데이터 구조에 맞게 수정 필요)
interface UseItem {
  id: string;
  name: string;
  role: string;
  salary: number;
  // 필요한 다른 속성들 추가...
}

const MemberComponent: React.FC = () => {
  const [memberData, setMemberData] = usePendingUsers();
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
  const [fields, setFields] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true); // 데이터를 불러오는 동안 로딩 상태 표시

  useEffect(() => {
    const fetchRolesAndFields = async () => {
      try {
        setLoading(true);

        const rolesResponse = await fetch('http://localhost:3001/user/roles');
        const rolesData = await rolesResponse.json();
        setRoles(
          rolesData.map((role: { role_name: string }) => ({
            value: role.role_name,
            label: role.role_name,
          }))
        );

        const fieldsResponse = await fetch('http://localhost:3001/user/fields');
        const fieldsData = await fieldsResponse.json();
        setFields(
          fieldsData.map((field: { field_name: string }) => ({
            value: field.field_name,
            label: field.field_name,
          }))
        );
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRolesAndFields();
  }, []);

  const handleApprove = async (index: number, item: UseItem) => {
    try {
      const response = await approveHandler(index, item);
      if (response.ok) {
        const updatedData = memberData.filter((_item, i) => i !== index);
        setMemberData(updatedData);
      }
    } catch (error) {
      console.error("승인 처리 중 오류:", error);
    }
  };

  const handleCancel = async (index: number, item: UseItem) => {
    try {
      const response = await cancelHandler(index, item);
      if (response.ok) {
        const updatedData = memberData.filter((_, i) => i !== index);
        setMemberData(updatedData);
        alert('취소 성공');
      } else {
        console.error('취소 실패');
      }
    } catch (error) {
      console.error('취소 처리 중 오류 발생', error);
    }
  };

  const handleInputChange = (index: number, field: keyof UserItem, value: string | number) => {
    const updatedData = [...memberData];
    updatedData[index][field] = value;
    setMemberData(updatedData);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={style.container}>
      {memberData.map((item, index) => (
        <UserItem
        key={index}
        index={index}
        item={item as UserItem}  // item을 명확하게 UserItem 타입으로 캐스팅
        onApprove={handleApprove}
        onCancel={handleCancel}
        onInputChange={handleInputChange}
        roles={roles}
        fields={fields}
      />
      
      ))}
    </div>
  );
};

export default MemberComponent;
