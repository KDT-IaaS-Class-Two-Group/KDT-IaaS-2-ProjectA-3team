import React, { useEffect, useState } from 'react';
import MemberComponent from 'client/components/MemberVerification/MemberComponent';
import getPendingUsers from 'client/model/services/getPendingUsersData';

const Dash: React.FC = () => {
  const [memberData, setMemberData] = useState<[{ [key: string]: any }]>([{}]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const users = await getPendingUsers();
        await setMemberData(users);
        console.log(memberData);
      } catch (error) {
        console.error('GET 요청 실패 : getPendingUserData', error);
      }
    };

    fetchPendingUsers();
  }, []);

  return <MemberComponent memberData={memberData} />;
};

export default Dash;
