import { useState, useEffect } from 'react';
import { User } from './usertypes';

const useFetchCheckProfile = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCheckProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/getUser/checkprofile");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      setError("사용자 정보 조회 실패: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckProfile();
  }, []);

  return { users, loading, error, fetchCheckProfile };
};

export default useFetchCheckProfile;
