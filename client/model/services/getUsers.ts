const getUser = async () => {
  console.log('야호');
  const response = await fetch('http://localhost:3001/getUser/all');
  const resJson = await response.json();
  console.log(resJson);
};

export default getUser;
