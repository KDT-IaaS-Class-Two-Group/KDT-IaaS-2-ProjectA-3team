import React, { useState, useEffect } from 'react';
import * as style from 'client/styles/pending/pending_component.css';
import { approveHandler } from './services/approve/fetchApproveData';
import { cancelHandler } from './services/cancel/fetchCancelData';
import {usePendingUsers} from './hook/usePendingUser';
import UserItem from './item/userItem';
interface User{
  id: number;
  name: string;
  role: string;
  salary: number;
}
const MemberComponent: React.FC = () => {
  const [memberData, setMemberData] = usePendingUsers();
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
  const [fields, setFields] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true); // 데이터를 불러오는 동안 로딩 상태 표시

  // 권한과 분야 데이터를 fetch로 가져오는 useEffect
  useEffect(() => {
    const fetchRolesAndFields = async () => {
      try {
        setLoading(true);

        // 권한(role) 데이터를 가져오는 fetch 요청
        const rolesResponse = await fetch('http://localhost:3001/user/roles');
        const rolesData = await rolesResponse.json();
        setRoles(
          rolesData.map((role: { role_name: string }) => ({
            value: role.role_name,
            label: role.role_name
          }))
        );

        // 분야(field) 데이터를 가져오는 fetch 요청
        const fieldsResponse = await fetch('http://localhost:3001/user/fields');
        const fieldsData = await fieldsResponse.json();
        setFields(
          fieldsData.map((field: { field_name: string }) => ({
            value: field.field_name,
            label: field.field_name
          }))
        );
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false); // 데이터를 모두 불러온 후 로딩 상태 해제
      }
    };

    fetchRolesAndFields();
  }, []);

  const handleApprove = async (index: number, item: { [key: string]: any }) => {
    try {
      const response = await approveHandler(index, item);
      if (response.ok) {
        const updatedData = memberData.filter((_, i) => i !== index);
        setMemberData(updatedData);
        alert('승인 성공');
      } else {
        console.error('승인 실패');
      }
    } catch (error) {
      console.error('승인 처리 중 오류 발생', error);
    }
  };

  const handleCancel = async (index: number, item: { [key: string]: any }) => {
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

  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedData = [...memberData];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value, // 타입 단언을 통해 안전성을 확보
    };
    setMemberData(updatedData);
  };
  
  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <div className={style.container}>
      {memberData.map((item, index) => (
        <UserItem
          key={index}
          index={index}
          item={item}
          onApprove={handleApprove}
          onCancel={handleCancel}
          onInputChange={handleInputChange}
          roles={roles}  // 서버에서 가져온 roles 데이터 전달
          fields={fields}  // 서버에서 가져온 fields 데이터 전달
        />
      ))}
    </div>
  );
};

export default MemberComponent;