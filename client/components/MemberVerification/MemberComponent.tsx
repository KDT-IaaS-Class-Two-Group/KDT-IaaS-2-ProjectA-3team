import * as style from 'client/styles/pending/pending_component.css';

import { approveHandler } from './services/fetchApproveData';
import { cancleHandler } from './services/fetchCancleData';
import { MemberProps } from './interface/MemberProps.interface';

const MemberComponent: React.FC<MemberProps> = ({ memberData }) => {
  return (
    <div className={style.container}>
      {memberData.map((item, index) => (
        <div key={index} className={style.contentWrapper}>
          <h1>{index + 1}</h1>  
          {Object.entries(item).map(([key, value]) => (
            <div key={key} className={style.content}>
              <p>
                {key}: {value}
              </p>
            </div>
          ))}
          <button
            onClick={async () => {
              await approveHandler(index, item);
            }}
          >
            승인
          </button>
          <button
            onClick={async () => {
              await cancleHandler(index, item);
            }}
          >
            취소
          </button>
        </div>
      ))}
    </div>
  );
};

export default MemberComponent;
