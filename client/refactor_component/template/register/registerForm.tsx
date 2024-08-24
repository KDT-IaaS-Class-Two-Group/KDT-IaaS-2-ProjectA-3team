import React from "react";
import useRegisterHooks from "../../organism/register/hook/registerHooks";
import FormField from "../../molecule/register_form_field/registr_form_field";
import Button from "client/refactor_component/atom/button/button";
import { registerForm, formGroup, input } from "../../../styles/info/register.css";
import { buttonLinkClone } from "client/styles/info/index.css";

/**
 * @function RegisterForm
 * @brief 회원가입 폼 컴포넌트
 * @details 이 컴포넌트는 사용자가 회원가입 정보를 입력할 수 있는 폼을 렌더링합니다.
 * 사용자는 사용자 이름, ID, 비밀번호, 비밀번호 확인, 이메일, 전화번호, 생년월일, 주소를 입력할 수 있으며,
 * 'Sign Up' 버튼을 클릭하여 회원가입을 진행할 수 있습니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 *
 * @component
 * @returns {JSX.Element} 회원가입 폼을 포함하는 JSX 엘리먼트
 */
const RegisterForm = () => {
  const {
    setEmail,
    setId,
    setUsername,
    setPassword,
    setPasswordCheck,
    setPhone,
    setAddress,
    setBirthDate,
    handleRegister,
  } = useRegisterHooks();

  return (
    <div className={registerForm}>
      <FormField
        id="username"
        label="Name"
        input_type="text"
        value=""
        placeholder="Enter your username"
        onChange={(e) => setUsername(e.target.value)}
        className={input}
      />
      <FormField
        id="user_id"
        label="ID"
        input_type="text"
        value=""
        placeholder="Enter your id"
        onChange={(e) => setId(e.target.value)}
        className={input}
      />
      <FormField
        id="password"
        label="Password"
        input_type="password"
        value=""
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        className={input}
      />
      <FormField
        id="passwordCheck"
        label="Confirm Password"
        input_type="password"
        value=""
        placeholder="Confirm your password"
        onChange={(e) => setPasswordCheck(e.target.value)}
        className={input}
      />
      <FormField
        id="email"
        label="Email"
        input_type="email"
        value=""
        placeholder="example@example.com"
        onChange={(e) => setEmail(e.target.value)}
        className={input}
      />
      <FormField
        id="phone"
        label="Phone Number"
        input_type="tel"
        value=""
        placeholder="123-456-7890"
        onChange={(e) => setPhone(e.target.value)}
        className={input}
      />
      <FormField
        id="birthDate"
        label="Date of Birth"
        input_type="date"
        value=""
        placeholder=""
        onChange={(e) => setBirthDate(e.target.value)}
        className={input}
      />
      <FormField
        id="address"
        label="Address"
        input_type="text"
        value=""
        placeholder="Enter your address"
        onChange={(e) => setAddress(e.target.value)}
        className={input}
      />
      <div>
        <Button
          button_text="Sign Up"
          button_style={buttonLinkClone}
          onClick={() => handleRegister()}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
