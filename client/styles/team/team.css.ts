import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";

export const maincontainter = style({
  backgroundColor: Colors.FontPrimary,
  width: Size.full,
  height: Size.full,
  borderRadius: Size.border,
  // alignItems: "center",
  // justifyContent: "center",
  // textAlign: "center",
});

export const padding = style({
  padding: "20px",
  display: "flex",
});

export const teampadding = style([
  padding,
  {
    textAlign : "center",
  },
]);

export const display = style({
  display: "flex",
});

export const input = style({
  backgroundColor: Colors.BackgroundSecondary,
  outline: "none",
  border: "0",
  paddingLeft: "10px",
  borderRadius: Size.border,
  height: "30px",
  marginLeft: "10px",
  color: Colors.FontSecondary,
});
export const textarea = style({
  backgroundColor: Colors.BackgroundSecondary,
  outline: "none",
  border: "0",
  paddingLeft: "10px",
  borderRadius: Size.border,
  marginLeft: "10px",
  color: Colors.FontSecondary,
});

export const listyle = style({
  listStyle: "none",
});
