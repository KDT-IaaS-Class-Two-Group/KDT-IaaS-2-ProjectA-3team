import { container, header, button } from "../../styles/mainview.css";

const LoginSuccessPage: React.FC = () => {
  return (
    <div className={container}>
      <h1 className={header}>Welcome to the Main Page</h1>
      <button className={button}>Logout</button>
    </div>
  );
};

export default LoginSuccessPage;
