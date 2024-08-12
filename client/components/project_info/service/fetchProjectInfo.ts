import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import ProjectInfo from "../interface/project_info.interface";
import { FETCH_ERROR } from "client/ts/enum/error/FETCH_ERROR.enum";
import { Dispatch, SetStateAction } from "react";

const fetchProjectInfo = async (project_name: string, setMemberData: Dispatch<SetStateAction<never[]>>, setProjectStack: Dispatch<SetStateAction<never[]>>) => {
  try {
    const res = await fetch(
      `${REQUEST_URL.__GET_PROJECT_INFO}/${project_name}`
    );
    if (!res.ok) {
      throw new Error(FETCH_ERROR.__FAILURE_GET_PROJECT_INFO);
    }
    const res_data: ProjectInfo = await res.json();
    setMemberData(res_data.member);
    setProjectStack (res_data.stack);
  } catch (error) {
    console.error(error);
  }
};
export default fetchProjectInfo