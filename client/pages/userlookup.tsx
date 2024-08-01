import userlookup from "client/model/services/userlookup";

const TestPage: React.FC = () => {
  return (
    <div>
      <h1>사용자를 조회해보자</h1>
      <button
        onClick={() => {
          userlookup();
        }}
      >
        조회하기
      </button>
    </div>
  );
};

export default TestPage;
