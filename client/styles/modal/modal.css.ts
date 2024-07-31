import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
});

export const modal = style({
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "20px",
  width: "80%",
  maxWidth: "500px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  position: "relative",
});

export const closeButton = style({
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
  fontSize: "16px",
});
