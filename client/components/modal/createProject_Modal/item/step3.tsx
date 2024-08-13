import { FETCH_ERROR } from "client/ts/enum/error/FETCH_ERROR.enum";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import { SetStateAction, Dispatch } from "react";
import { useState, useEffect } from "react";
import fetchTeamList from "../service/fetchTeamData";
import { bold32Text } from "client/styles/standardtextsize.css";
import { listinitial } from "client/styles/users/attendancestyle.css";
import {
  projectgap,
  projectmodalbtn,
  projectpadding,
  teamlist,
} from "../../style/modal.css";
import { flexrowcontainer } from "client/styles/standardcontainer.css";
import { blueButton } from "client/styles/templatebutton.css";
interface Team {
  team_name: string;
  description: string;
}
interface StepProps {
  handleNext: () => void;
  setTeam: Dispatch<SetStateAction<string>>;
  team: string;
}

const Step3: React.FC<StepProps> = ({ handleNext, setTeam, team }) => {
  const [data, setData] = useState<any[]>([]); // 초기값을 빈 배열로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 상태 관리

  useEffect(() => {
    // 비동기 함수 정의
    const fetchData = async () => {
      try {
        const data = await fetchTeamList();
        setData(data); // 데이터 상태 업데이트
      } catch (error: any) {
        setError(error.message); // 에러 상태 업데이트
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData(); // 비동기 함수 호출
  }, []); // 빈 배열을 의존성 배열로 전달하여 컴포넌트 마운트 시에만 실행

  // 로딩 중일 때
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러가 발생했을 때
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={bold32Text}>팀 할당</div>
      <ul className={listinitial}>
        {data.map((item, index) => (
          <li key={index} className={projectpadding}>
            {item.team_name} : {item.description}
            <button
              className={projectmodalbtn}
              onClick={() => {
                setTeam(item.team_name);
              }}
            >
              해당 팀 선택
            </button>
          </li> // 데이터의 title 프로퍼티를 사용하여 리스트 아이템을 렌더링
        ))}
        <div className={flexrowcontainer}>
          <div className={teamlist}>현재 선택된 팀 : {team}</div>
          <button className={projectmodalbtn} onClick={handleNext}>
            다음
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Step3;
