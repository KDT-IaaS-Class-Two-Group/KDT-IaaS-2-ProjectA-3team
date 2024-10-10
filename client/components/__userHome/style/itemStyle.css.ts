import { style } from "@vanilla-extract/css";
import { Colors } from "client/styles/standard.css";

export const itemContainer = style({
  backgroundColor: "#1e1e1e",
  margin: "10px",
  paddingLeft: "40px",
  color: "white",
  borderRadius: "10px",
});

export const HeaderContainer = style({
  backgroundColor: Colors.StatusLightBlue,
  color: Colors.FontSecondary,
  ":hover": {
    backgroundColor: Colors.StatusBlue,
  },
  display: "flex",
  width: "20vw",

  textAlign: "center",
  justifyContent: "center",
  borderRadius: "10px",
  fontSize: "20px",
});
