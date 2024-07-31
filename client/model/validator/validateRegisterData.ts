/**
 * * Function : validate*
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @description : Client에서 수행되는 유효성 검사 모듈
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[가-힣A-Za-z\s]+$/;
  return nameRegex.test(name) && name.length > 0;
};
export const validateId = (id: string): boolean => {
  const idRegex = /^[a-z0-9]{5,12}$/;

  return idRegex.test(id) && id.length > 0;
};

export const validateAddress = (address: string): boolean => {
  return address.length > 0;
};

export const validateDate = (dateString: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString);
};

export const ValidatePassword = (pw: string): boolean => {
  const pwRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,18}$/;
  return pwRegex.test(pw);
};
