import * as style from 'client/styles/pending/pending_component.css';
import { approveHandler } from './services/approve/fetchApproveData';
import { cancelHandler } from './services/cancel/fetchCancelData';
import { usePendingUsers } from './hook/usePendingUser';
import UserItem from './item/userItem';

const MemberComponent: React.FC = () => {
  const [memberData, setMemberData] = usePendingUsers();

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

  return (
    <div className={style.container}>
      {memberData.map((item, index) => (
        <UserItem
          key={index}
          index={index}
          item={item}
          onApprove={handleApprove}
          onCancel={handleCancel}
        />
      ))}
    </div>
  );
};

export default MemberComponent;
