import useRegisterHooks from "client/hooks/registerHooks";

import {
  registerForm,
  formGroup,
  label,
  input,
  button,
} from "../../styles/register.css";

/**
 * * Function : RegisterForm
 *  * @function RegisterForm
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * @description : 회원가입 Form
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
        <label htmlFor="username" className={label}>
          Username
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
          id
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

      <button type="button" onClick={() => handleRegister()} className={button}>
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
