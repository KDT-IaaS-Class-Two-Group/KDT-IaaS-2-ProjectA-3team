import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";
export const pagemaincontainer = style({
  display: "flex",
  flexDirection: "column",
});
export const pagemaintext = style({
  fontSize: FontSize.XLarge,
  paddingBottom: "2vw",
  borderBottom: "1px solid white",
  marginBottom: "2vw",
});
export const pagemainmain = style({
  backgroundColor: Colors.FontPrimary,
  borderRadius: Size.border,
  padding: "5vw 5vw 0vw 5vw",
});
export const pageinput = style({
  fontSize: FontSize.Large,
  paddingBottom: "1.5vw",
  display: "flex",
  gap: "1vw",
  borderRadius: Size.border,
});
export const pageteamtext = style({
  fontSize: FontSize.Large,
  paddingBottom: "1.5vw",
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
});
export const pagetextsub = style([
  pageteamtext,
  {
    display: "flex",
    flexDirection: "row",
    gap: "1vw",
  },
]);
export const pageul = style({
  margin: "0",
  padding: "0",
  paddingTop: "1.5vw",
});
export const pagetextarea = style({
  outline: "none",
  border: "0",
  paddingLeft: Spacing.small,
  paddingTop: Spacing.small,
  marginLeft: Spacing.xsmall,
});
export const teambuttoncontainer = style({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "2vw",
});
