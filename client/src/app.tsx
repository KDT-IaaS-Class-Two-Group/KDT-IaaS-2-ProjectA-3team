import React from "react";
const Input: React.FC = () => {
  return <input type="text" placeholder="Enter your input here" />;
};
const App: React.FC = () => {
  return (
    <div>
      <Input />
    </div>
  );
};

export default App;
