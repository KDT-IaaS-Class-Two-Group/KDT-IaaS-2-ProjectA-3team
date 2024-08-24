// handleBioChange.tsx

import React from "react";

export const handleBioChange = (
  userId: string,
  value: string,
  setBios: React.Dispatch<React.SetStateAction<Map<string, string>>>
) => {
  setBios((prevBios) => new Map(prevBios).set(userId, value));
};