export default interface CardSectionProps {
  sectionClassName: string;
  title: string;
  buttonText: string;
  onClick: () => void;
  content: React.ReactNode;
}
