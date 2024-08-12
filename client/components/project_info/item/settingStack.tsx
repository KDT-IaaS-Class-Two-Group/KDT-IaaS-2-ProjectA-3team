import { useEffect, useState } from "react";
import { StackResult } from "../interface/stackResult.interface";
import searchStacks from "../service/fetchSearchData";
import fetchPostStack from "../service/fetchPostStack";

interface Stack_Props {
  project_name: string;
  onClose: () => void;
}
const StackSearch: React.FC<Stack_Props> = ({ project_name, onClose }) => {
  // query -> input 창에 존재하는 value 값 : fetch를 통해 전송되는 값
  const [query, setQuery] = useState("");
  // result -> fetch를 통해 출력되는 검색 결과 값
  const [results, setResults] = useState<StackResult[]>([]);
  // projectStack -> fetch 를 통해 Post 할 예정인 값.
  const [projectStack, setProjectStack] = useState<StackResult[]>([]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await searchStacks(query, setResults);
    }
  };

  // [ ] 저장버튼 구현하기
  return (
    <div>
      <div>
        {projectStack.length > 0 ? (
          <div>
            <h2>저장된 스택</h2>
            {projectStack.map((stack) => (
              <p key={stack.stack_name}>{stack.stack_name}</p>
            ))}
          </div>
        ) : (
          <p>No saved stacks</p>
        )}
        <button
          onClick={() => {
            fetchPostStack(projectStack, project_name);
            onClose();
          }}
        >
          저장
        </button>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Stack을 입력해주세요"
      />
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((stack, index) => (
              <div>
                <li key={index}>
                  {stack.stack_name} ({stack.stack_type})
                </li>
                <button
                  onClick={() => {
                    const data = [...projectStack, stack];
                    setProjectStack(data);
                    console.log(projectStack);
                  }}
                >
                  추가
                </button>
              </div>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default StackSearch;
