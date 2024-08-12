import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";
export const listinitial = style({
  listStyleType: "none",
  margin: 0,
  padding: 0,
});
export const liststylemainattendance = style([
  listinitial,
  {
    fontSize: FontSize.Medium,
  },
]);
export const listline = style({
  borderBottom: "1px solid white",
  marginBottom: "0.25vw",
  paddingBottom: "0.5vw",
});
