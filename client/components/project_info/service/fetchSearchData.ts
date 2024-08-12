import { Dispatch, SetStateAction } from "react";
import { StackResult } from "../interface/stackResult.interface"; 

const searchStacks = async (searchQuery: string, setResults: Dispatch<SetStateAction<StackResult[]>>) => {
  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
    const data: StackResult[] = await response.json();
    setResults(data);
  } catch (error) {
    console.error('Stack을 찾는데 실패했습니다.', error);
  }
};

export default searchStacks;
