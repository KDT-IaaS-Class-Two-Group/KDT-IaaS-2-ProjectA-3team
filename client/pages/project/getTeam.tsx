import getUser from 'client/model/services/getUsers';

const TestPage: React.FC = () => {
  return (
    <div>
      <button
        onClick={() => {
          getUser();
        }}
      >
        출력 버튼
      </button>
    </div>
  );
};

export default TestPage;
