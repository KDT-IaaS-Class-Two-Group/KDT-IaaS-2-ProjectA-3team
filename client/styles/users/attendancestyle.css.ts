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
export const pendinglist = style([
  listinitial,
  liststylemainattendance,
  {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1vw",
  },
]);
export const listline = style({
  borderBottom: "1px solid white",
  marginBottom: "0.25vw",
  paddingBottom: "0.5vw",
});
export const pendingdiv = style({
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: "1vw",
});
export const pendingmaindiv = style([
  pendingdiv,
  {
    display: "flex",
    flexDirection: "column",
  },
]);
