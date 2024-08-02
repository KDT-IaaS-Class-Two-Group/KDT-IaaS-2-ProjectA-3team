import * as style from 'client/styles/project/main.css';
interface mainProps {
  openModal: () => void;
}
const Main: React.FC<mainProps> = ({ openModal }) => {
  return (
    <div className={style.container}>
      <button onClick={openModal}>프로젝트 생성</button>
    </div>
  );
};

export default Main;
