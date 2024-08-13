import { Dispatch, SetStateAction, useState } from "react";
import StackSearch from "./settingStack";
import Modal from "client/components/modal/modal";
import { useRouter } from "next/router";
import StackButtonProps from "../interface/props/addStackButtonProps";

const AddStackButton: React.FC<StackButtonProps> = ({setProjectStack , project_name, stack}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <button onClick={onOpen}>Stack 추가</button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <StackSearch project_name={project_name} onClose={onClose} setStateProject = {setProjectStack} stack = {stack} ></StackSearch>
      </Modal>
    </div>
  );
};

export default AddStackButton;
