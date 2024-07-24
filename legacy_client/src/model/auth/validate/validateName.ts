const ValidateName = (name: string): boolean => {
  const regex =
    /^[가-힣]{2,8}$/;
  return regex.test(name);
};

export default ValidateName;