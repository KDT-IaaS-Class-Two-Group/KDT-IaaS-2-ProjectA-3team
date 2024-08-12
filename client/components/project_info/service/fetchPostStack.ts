import { Dispatch, SetStateAction } from "react";
import { StackResult } from "../interface/stackResult.interface";

const fetchPostStack = async (data: StackResult[], project_name : string) => {
  try {
    const response = await fetch(`http://localhost:3001/project/save/stack/${project_name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });

  } catch (error) {
    console.error('Stack을 찾는데 실패했습니다.', error);
  }
};

export default fetchPostStack;
