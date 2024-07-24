import useRegisterHooks from "client/viewModel/registerHooks";

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
    <div className="register-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="passwordCheck">Confirm Password</label>
        <input
          id="passwordCheck"
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => setPasswordCheck(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          placeholder="123-456-7890"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          placeholder="Enter your address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="birth">Date of Birth</label>
        <input
          id="birth"
          type="date"
          onChange={(e) => {
            const dateObject = new Date(e.target.value);
            setBirth(dateObject);
          }}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="joinDate">Join Date</label>
        <input
          id="joinDate"
          type="date"
          onChange={(e) => {
            const dateObject = new Date(e.target.value);
            setJoinDate(dateObject);
          }}
          required
        />
      </div>

      <button
        type="button"
        onClick={() => {
          handleRegister();
        }}
      >
        Send
      </button>
    </div>
  );
};

export default RegisterForm;
