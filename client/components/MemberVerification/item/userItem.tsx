import * as style from 'client/styles/pending/pending_component.css';

interface UserItemProps {
  item: { [key: string]: any };
  index: number;
  onApprove: (index: number, item: { [key: string]: any }) => void;
  onCancel: (index: number, item: { [key: string]: any }) => void;
}

const UserItem: React.FC<UserItemProps> = ({ item, index, onApprove, onCancel }) => {
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
      <button onClick={() => onApprove(index, item)}>승인</button>
      <button onClick={() => onCancel(index, item)}>취소</button>
    </div>
  );
};

export default UserItem;
