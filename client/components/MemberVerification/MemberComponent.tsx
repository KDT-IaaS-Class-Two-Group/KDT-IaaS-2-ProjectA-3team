import React from 'react';
import * as style from 'client/styles/pending/pending_component.css'


interface MemberProps {
  memberData: {
    [key: string]: any;
  }[];
}

const MemberComponent: React.FC<MemberProps> = ({ memberData }) => {

  const approveHandler = async (index :number, item : {[key:string] : any} )=>{
    const response = await fetch('http://localhost:3001/approve', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
      },
      credentials : 'include',
      body : JSON.stringify(item)
    });


  }

  return (
    <div className={style.container}>
      
      {memberData.map((item, index) => (
        
        <div key={index} className={style.contentWrapper}>
          <h1>{index+1}</h1>
          {Object.entries(item).map(([key, value]) => (
            <div key={key} className={style.content}>
              <p>{key}: {value}</p>
            </div>
          ))}
          <button onClick={async ()=>{
            await approveHandler(index, item);
          }}>승인</button>
          <button>취소</button>
        </div>
      ))}

    </div>
  );
};

export default MemberComponent;
