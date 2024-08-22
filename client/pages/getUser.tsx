import getUser from "client/model/services/getUsers";


const TestPage: React.FC = () => {
  return (
    <div>
      <h1>사용자 조회하기</h1>
      <button
        onClick={() => {
          getUser();
        }}
      >
        조회하기
      </button>
    </div>
  );
};

export default TestPage;
