// styles.css.ts
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  textAlign: "center",
  padding: "20px",
});

export const heading = style({
  fontSize: "2rem",
  marginBottom: "20px",
});

export const buttonLink = style({
  background: "none",
  border: "none",
  color: "#0070f3",
  textDecoration: "underline",
  cursor: "pointer",
  padding: "10px 20px",
  fontSize: "1rem",
  margin: "10px 0",

  ":hover": {
    textDecoration: "none",
  },
});

export const content = style({
  marginTop: "20px",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "100%",
  maxWidth: "600px",
});
