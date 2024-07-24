import React from "react";

interface SelectOptionProps {
  name: string; // 부모 컴포넌트로부터 전달받는 이름
}

const SelectOption: React.FC<SelectOptionProps> = ({ name }) => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  // 옵션이 변경되었을 때 호출되는 핸들러
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // 버튼 클릭 시 서버에 데이터 전송
  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/submitOption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, // 전달받은 name
          role: selectedOption, // 선택된 role
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <p>Selected Name: {name}</p>
      <label htmlFor="optionSelect">Select an option</label>
      <select
        id="optionSelect"
        value={selectedOption}
        onChange={handleOptionChange}
        aria-label="Select option"
      >
        <option value="">Select an option</option>
        <option value="Option1">Option 1</option>
        <option value="Option2">Option 2</option>
        <option value="Option3">Option 3</option>
        <option value="Option4">Option 4</option>
        <option value="Option5">Option 5</option>
      </select>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default SelectOption;
