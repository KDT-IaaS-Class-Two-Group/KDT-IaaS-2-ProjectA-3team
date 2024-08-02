const getPendingUsers = async () : Promise<[{[key:string] : any}]> => {

  const response = await fetch('http://localhost:3001/getUser/pending', {
    method: "GET", headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }
  );
  const resJson = await response.json();
  console.log(resJson);
  return resJson;
};

export default getPendingUsers;
