import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";

export const maincontainter = style({
  backgroundColor: Colors.FontPrimary,
  width: Size.full,
  height: Size.full,
  borderRadius: Size.border,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});
export const secondcontainer = style({
  marginTop: Spacing.large,
  borderRadius: Size.border,
  marginLeft: "25%",
  width: "50%",
  backgroundColor: Colors.BackgroundSecondary,
});

export const padding = style({
  padding: "20px",
  alignItems: "center",
  justifyContent: "center",
});

export const teampadding = style([
  padding,
  {
    textAlign: "center",
  },
]);
export const margin = style({
  paddingTop: Spacing.medium,
});
export const display = style({
  display: "flex",
});

export const input = style({
  backgroundColor: Colors.FontPrimary,
  outline: "none",
  border: "0",
  paddingLeft: Spacing.small,
  borderRadius: Size.border,
  height: "30px",
  marginLeft: Spacing.small,
  color: Colors.FontSecondary,
});
export const textarea = style({
  backgroundColor: Colors.FontPrimary,
  outline: "none",
  border: "0",
  paddingLeft: Spacing.small,
  paddingTop: Spacing.small,
  borderRadius: Size.border,
  marginLeft: Spacing.xsmall,
  color: Colors.FontSecondary,
});

export const listyle = style({
  listStyle: "none",
  display: "flex",
  padding: Spacing.xsmall,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});
