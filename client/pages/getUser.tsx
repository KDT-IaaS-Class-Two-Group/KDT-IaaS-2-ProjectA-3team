/**
 * @file TestPage.tsx
 * @brief 이 파일은 사용자를 조회하는 버튼이 있는 테스트 페이지 컴포넌트를 포함하고 있습니다.
 */
import React from "react";
import getUser from "client/model/services/getUsers";
import Button from "../refactor_component/atom/button/button";
import { greenButton } from "client/styles/templatebutton.css";
/**
 * @brief 사용자를 조회하는 버튼을 포함하는 테스트 페이지 컴포넌트입니다.
 * 
 * 이 컴포넌트는 버튼을 클릭하면 `getUser` 함수를 호출하여 사용자를 조회합니다.
 * 버튼은 `greenButton` 스타일을 적용받습니다.
 * 
 * @returns React.FC 이 컴포넌트는 React 함수형 컴포넌트입니다.
 */
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
 