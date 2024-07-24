export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[가-힣A-Za-z\s]+$/;
  return nameRegex.test(name) && name.length > 0;
};

export const validateAddress = (address: string): boolean => {
  return address.length > 0;
};

export const validateDate = (date: Date): boolean => {
  const formattedDate = date.toISOString().split("T")[0];
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(formattedDate);
};

export const ValidatePassword = (pw: string): boolean => {
  const pwRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,18}$/;
  return pwRegex.test(pw);
};
