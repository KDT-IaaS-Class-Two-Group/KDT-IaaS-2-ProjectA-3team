import { Dispatch, SetStateAction } from "react";
import { FETCH_ERROR } from "client/ts/enum/error/FETCH_ERROR.enum";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import { StackResult } from "../interface/stackResult.interface";

const searchStacks = async (
  searchQuery: string,
  setResults: Dispatch<SetStateAction<StackResult[]>>
) => {
  try {
    const response = await fetch(
      `${REQUEST_URL.__GET_SEARCH_STACK}/${searchQuery}`
    );
    const data: StackResult[] = await response.json();
    setResults(data);
  } catch (error) {
    console.error(FETCH_ERROR.__FAILURE_GET_STACK, error);
  }
};

export default searchStacks;
