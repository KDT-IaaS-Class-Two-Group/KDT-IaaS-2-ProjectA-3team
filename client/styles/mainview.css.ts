import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
});

export const header = style({
  fontSize: "2rem",
  marginBottom: "1rem",
  color: "#333",
});

export const button = style({
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  color: "#fff",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "0.25rem",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#0056b3",
  },
});
