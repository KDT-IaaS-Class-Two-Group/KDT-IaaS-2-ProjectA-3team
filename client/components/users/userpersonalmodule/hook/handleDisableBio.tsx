import React from "react";

export const handleDisableBio = (
  userId: string,
  setDisabledUsers: React.Dispatch<React.SetStateAction<Map<string, boolean>>>
) => {
  setDisabledUsers((prevDisabled) => new Map(prevDisabled).set(userId, true));
  alert("비활성화되었습니다.");
};
