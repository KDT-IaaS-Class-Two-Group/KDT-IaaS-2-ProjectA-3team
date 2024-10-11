import Modal from "client/components/modal/modal";
import { yellowButton } from "client/styles/templatebutton.css";
import StackButtonProps from "../interface/props/addStackButtonProps";
import StackSearch from "./settingStack";

const AddStackButton: React.FC<StackButtonProps> = ({
  setProjectStack,
  project_name,
  stack,
  isOpen,
  onOpen,
  onClose,
}) => {
  return (
    <div>
      <button className={yellowButton} onClick={onOpen}>
        Stack 추가
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <StackSearch
          project_name={project_name}
          onClose={onClose}
          setStateProject={setProjectStack}
          stack={stack}
        ></StackSearch>
      </Modal>
    </div>
  );
};

export default AddStackButton;
