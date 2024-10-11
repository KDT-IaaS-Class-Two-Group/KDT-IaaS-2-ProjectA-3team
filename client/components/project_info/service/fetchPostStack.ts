import { StackResult } from "../interface/stackResult.interface";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchPostStack = async (data: StackResult[], project_name: string) => {
  try {
    /* empty */
  } catch (error) {
    console.error("Stack을 찾는데 실패했습니다.", error);
  }
};

export default fetchPostStack;
