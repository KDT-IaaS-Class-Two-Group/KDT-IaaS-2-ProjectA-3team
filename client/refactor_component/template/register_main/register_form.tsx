import useRegisterHooks from "../../organism/register_main/hook/use.registerHooks";

import {
  registerForm,
  formGroup,
  label,
  input,
} from "../../../styles/info/register.css";
import { buttonLinkClone } from "client/styles/info/index.css";

/**
 * @function RegisterForm
 * @brief 회원가입 폼 컴포넌트
 * @description 사용자가 회원가입 정보를 입력할 수 있는 폼을 제공하는 컴포넌트입니다. 사용자는 사용자 이름, ID, 비밀번호, 비밀번호 확인, 이메일, 전화번호, 생년월일, 주소를 입력할 수 있으며, 'sign up' 버튼을 클릭하여 회원가입을 진행할 수 있습니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 *
 * @component
 * @returns {JSX.Element} 회원가입 폼을 포함하는 JSX 엘리먼트
 *
 * @example
 * // RegisterForm 컴포넌트를 렌더링하는 예제
 * <RegisterForm />
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
      <div className={formGroup}>
        <label htmlFor="username" className={label}>
          Name
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
          className={input}
        />
      </div>
      <div className={formGroup}>
        <label htmlFor="id" className={label}>
          ID
        </label>
        <input
          id="user_id"
          type="text"
          placeholder="Enter your id"
          onChange={(e) => setId(e.target.value)}
          required
          className={input}
        />
      </div>
      <div className={formGroup}>
        <label htmlFor="password" className={label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className={input}
        />
      </div>
      <div className={formGroup}>
        <label htmlFor="passwordCheck" className={label}>
          Confirm Password
        </label>
        <input
          id="passwordCheck"
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => setPasswordCheck(e.target.value)}
          required
          className={input}
        />
      </div>
      <div className={formGroup}>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
          className={input}
        />
      </div>
      <div className={formGroup}>
        <label htmlFor="phone" className={label}>
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="123-456-7890"
          onChange={(e) => setPhone(e.target.value)}
          required
          className={input}
        />
      </div>
      <div className={formGroup}>
        <label htmlFor="birthDate" className={label}>
          Date of Birth
        </label>
        <input
          id="birthDate"
          type="date"
          onChange={(e) => setBirthDate(e.target.value)}
          required
          className={input}
        />
      </div>
      <div className={formGroup}>
        <label htmlFor="address" className={label}>
          Address
        </label>
        <input
          id="address"
          type="text"
          placeholder="Enter your address"
          onChange={(e) => setAddress(e.target.value)}
          required
          className={input}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => handleRegister()}
          className={buttonLinkClone}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
