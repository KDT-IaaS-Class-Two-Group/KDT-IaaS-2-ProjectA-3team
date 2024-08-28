import { useState } from "react";
import { CommuteButtonProps } from "./props/commute_button.props";
import postFetchData from "client/service/postFetch";

const CommuteButton: React.FC<CommuteButtonProps> = ({ user_id }) => {
  const [status, setStatus] = useState("");

  const handleClockAction = async (
    action: "clockin" | "clockout",
    successMessage: string,
    failureMessage: string
  ) => {
    try {
      const response = await postFetchData(
        `http://localhost:3001/getUser/${action}`,
        JSON.stringify({ user_id })
      );

      if (response.ok) {
        const result = await response.json();
        console.log(`${action} :`, result);
        setStatus(successMessage);
      } else {
        console.error(`${action} :`, response.statusText);
        setStatus(failureMessage);
      }
    } catch (error) {
      console.error(`${action} :`, error);
      setStatus(failureMessage);
    }
  };
  return (
    <div>
      <div>
        <button
          onClick={() =>
            handleClockAction(
              "clockin",
              "출근 처리되었습니다.",
              "출근 처리에 실패했습니다."
            )
          }
        >
          출근
        </button>
        <button
          onClick={() =>
            handleClockAction(
              "clockout",
              "퇴근 처리되었습니다.",
              "퇴근 처리에 실패했습니다."
            )
          }
        >
          퇴근
        </button>
      </div>
      {status && <p>{status}</p>}
    </div>
  );
};

export default CommuteButton;
