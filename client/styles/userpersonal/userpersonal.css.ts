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
  width: "50%",
  backgroundColor: Colors.BackgroundSecondary,
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
export const listyle = style({
  listStyle: "none",
  display: "flex",
  padding: Spacing.xsmall,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});
export const divstyle = style({
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});
// 버튼
export const baseButton = style({
  padding: `${Spacing.small} ${Spacing.medium}`,
  border: "none",
  borderRadius: Size.border,
  fontSize: FontSize.Medium,
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s ease",
});

export const yellowButton = style([
  baseButton,
  {
    backgroundColor: Colors.StatusLightYellow,
    color: Colors.FontPrimary,
    marginLeft: Spacing.small,
    ":hover": {
      backgroundColor: Colors.StatusYellow,
    },
  },
]);
export const blueButton = style([
  baseButton,
  {
    backgroundColor: Colors.StatusLightBlue,
    color: Colors.FontSecondary,
    marginLeft: "45%",
    marginTop: Spacing.medium,
    ":hover": {
      backgroundColor: Colors.StatusBlue,
    },
  },
]);
export const greenButton = style([
  baseButton,
  {
    backgroundColor: Colors.StatusLightGreen,
    color: Colors.FontSecondary,
    ":hover": {
      backgroundColor: Colors.StatusGreen,
    },
  },
]);
