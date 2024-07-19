import React from "react";
interface ButtonEventProps {
  eventFunc: () => void;
}
const Button: React.FC<ButtonEventProps> = ({ eventFunc }) => {
  return <button onClick={eventFunc}>Submit</button>;
};
export default Button;
