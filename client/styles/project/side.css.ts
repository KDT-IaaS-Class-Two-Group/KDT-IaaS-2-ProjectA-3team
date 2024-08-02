import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "232px",
  height: "100vh",
  backgroundColor: "#171717",
});

export const info = style({
  // position: "absolute",
  width: "191px",
  height: "325px",
  backgroundColor: "#1E1E1E",
  borderRadius: "10px",
  margin: "10px",
});
