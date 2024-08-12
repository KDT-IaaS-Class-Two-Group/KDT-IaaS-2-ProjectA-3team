import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Spacing, Size } from "./standard.css";

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
export const plusButton = style([
  baseButton,
  {
    borderRadius: "70vw",
    backgroundColor: Colors.StatusLightBlue,
    fontWeight: "bold",
    width: "1.5vw",
    textDecoration: "none",
    ":hover": {
      backgroundColor: Colors.StatusBlue,
    },
  },
]);
export const tdn = style({
  textDecoration: "none",
  color: "white",
});
export const purpleButton = style([
  baseButton,
  {
    backgroundColor: Colors.StatusLightPurple,
    color: Colors.FontSecondary,
    ":hover": {
      backgroundColor: Colors.StatusPurple,
    },
  },
]);

export const iconStyle = style({
  marginLeft: Spacing.xsmall,
  fontSize: FontSize.Small,
});
