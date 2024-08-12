import { Dispatch, SetStateAction, useState } from "react";
import StackSearch from "./settingStack";
import Modal from "client/components/modal/modal";
import { useRouter } from "next/router";
import StackButtonProps from "../interface/props/addStackButtonProps";

const AddStackButton: React.FC<StackButtonProps> = ({setProjectStack}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { id, query } = router.query;
  let projectName: string = "";
  if (id !== undefined && !Array.isArray(id)) {
    projectName = id;
  }
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
        <StackSearch project_name={projectName} onClose={onClose}></StackSearch>
      </Modal>
    </div>
  );
};

export default AddStackButton;
