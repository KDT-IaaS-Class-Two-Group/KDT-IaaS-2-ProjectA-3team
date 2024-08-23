import React from "react";
import getUser from "client/model/services/getUsers";
import Button from "../refactor_component/atom/button/button";
import { greenButton } from "client/styles/templatebutton.css";

const TestPage: React.FC = () => {
  return (
    <div>
      <h1>사용자 조회하기</h1>
      <Button
        button_text="조회하기"
        button_style={greenButton}  
        onClick={() => {
          getUser();
        }}
      />
    </div>
  );
};

export default TestPage;
