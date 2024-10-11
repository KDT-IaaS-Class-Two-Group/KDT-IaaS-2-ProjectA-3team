import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import { FETCH_ERROR } from "client/ts/enum/error/FETCH_ERROR.enum";
import ProjectInfo from "../interface/project_info.interface";

const fetchProjectInfo = async (project_name: string) => {
  try {
    const res = await fetch(
      `${REQUEST_URL.__GET_PROJECT_INFO}/${project_name}`
    );
    if (!res.ok) {
      throw new Error(FETCH_ERROR.__FAILURE_GET_PROJECT_INFO);
    }
    const res_data: ProjectInfo = await res.json();

    return res_data;
  } catch (error) {
    console.error(error);
  }
};
export default fetchProjectInfo;
