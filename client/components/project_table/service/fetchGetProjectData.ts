import REQUEST_URL from "client/ts/enum/REQUEST_URL.ENUM";
const getProjectData = async () => {
  const res = await fetch(REQUEST_URL.__GET_PROJECT_LIST, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`HTTP 에러 코드: ${res.status}`);
  }
  const fetchedData = await res.json();
  return fetchedData;
};
export default getProjectData;
