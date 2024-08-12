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
});

export const display = style({
  display: "flex",
});

export const input = style({
  backgroundColor: Colors.BackgroundSecondary,
  outline: "none",
  borderRadius: Size.border,
  height: "20px",
  display: "flex",
});

export const listyle = style({
  listStyle: "none",
});
