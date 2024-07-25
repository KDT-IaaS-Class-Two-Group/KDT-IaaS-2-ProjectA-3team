// RegisterForm.tsx
import useRegisterHooks from "client/viewModel/registerHooks";

import {
  registerForm,
  formGroup,
  label,
  input,
  button,
} from "../../styles/register.css";

const RegisterForm = () => {
  const {
    setEmail,
    setName,
    setPassword,
    setPasswordCheck,
    setPhoneNumber,
    setAddress,
    setBirth,
    setJoinDate,
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
        <label htmlFor="name" className={label}>
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
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
        <label htmlFor="phoneNumber" className={label}>
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          placeholder="123-456-7890"
          onChange={(e) => setPhoneNumber(e.target.value)}
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
        <label htmlFor="birth" className={label}>
          Date of Birth
        </label>
        <input
          id="birth"
          type="date"
          onChange={(e) => {
            const dateObject = new Date(e.target.value);
            setBirth(dateObject);
          }}
          required
          className={input}
        />
      </div>

      <div className={formGroup}>
        <label htmlFor="joinDate" className={label}>
          Join Date
        </label>
        <input
          id="joinDate"
          type="date"
          onChange={(e) => {
            const dateObject = new Date(e.target.value);
            setJoinDate(dateObject);
          }}
          required
          className={input}
        />
      </div>

      <button type="button" onClick={() => handleRegister()} className={button}>
        Send
      </button>
    </div>
  );
};

export default RegisterForm;
