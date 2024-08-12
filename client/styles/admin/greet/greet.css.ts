import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../../standard.css";

export const fullRowSection = style({
  gridColumn: "span 12",
  gridRow: "span 1",
  backgroundColor: Colors.BackgroundSecondary,
  fontSize: "bold",
  alignItems: "baseline",
  padding: "0",
});
export const titlecontainer = style({
  display: "flex",
  gap: "2vw",
  alignItems: "center",
});
export const basetext = style({
  borderRadius: "1rem",
  padding: "0.7rem",
});
export const titletext = style([
  basetext,
  {
    fontWeight: "bold",
    fontSize: FontSize.Large,
  },
]);
export const runtext = style([
  basetext,
  {
    fontSize: FontSize.Medium,
    backgroundColor: Colors.FontPrimary,
  },
]);
export const admintext = style([
  runtext,
  {
    color: Colors.StatusLightYellow,
  },
]);
