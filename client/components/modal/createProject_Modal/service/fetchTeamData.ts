import { FETCH_ERROR } from "client/ts/enum/error/FETCH_ERROR.enum";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";

const fetchTeamList = async () => {
  try {
    const res = await fetch(REQUEST_URL.__GET_TEAM_ALL);
    if (!res.ok) {
      throw new Error(FETCH_ERROR.__FAILURE_GET_TEAM);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    throw error;
  }
};
export default fetchTeamList;
