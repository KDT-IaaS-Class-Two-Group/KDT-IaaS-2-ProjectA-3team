const fetchCheckProject = async (id: string | string[] | undefined) => {
  const response = await fetch(`http://localhost:3001/project/check/${id}`)
  const data = await response.json();
  console.log(data);
}

export default fetchCheckProject;