const getUser = async () => {
  console.log("사용자 조회 및 권한 부여");
  const response = await fetch("http://localhost:3001/getUser/test");
  const resJson = await response.json();
  console.log(resJson);
};

export default getUser;
