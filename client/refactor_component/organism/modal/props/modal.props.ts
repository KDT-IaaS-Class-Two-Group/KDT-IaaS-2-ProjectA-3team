export default interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
  children?: React.ReactNode;
}