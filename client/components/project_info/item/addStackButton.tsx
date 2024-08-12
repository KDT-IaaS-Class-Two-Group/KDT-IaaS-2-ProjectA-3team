import { useState } from "react";
import Modal from "client/components/MODAL/modal";
import StackSearch from "./settingStack";

const AddStackButton = () => {
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
        <StackSearch></StackSearch>
      </Modal>
    </div>
  );
};

export default AddStackButton;
