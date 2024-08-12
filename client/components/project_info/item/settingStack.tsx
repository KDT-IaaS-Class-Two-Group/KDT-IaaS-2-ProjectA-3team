import { useEffect, useState } from "react";
import { StackResult } from "../interface/stackResult.interface";
import searchStacks from "../service/fetchSearchData";

const StackSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StackResult[]>([]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await searchStacks(query, setResults);
    }
  };

  return (
    <div>
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
              <li key={index}>
                {stack.stack_name} ({stack.stack_type})
              </li>
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
