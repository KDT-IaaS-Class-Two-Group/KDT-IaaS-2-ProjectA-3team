import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Spacing } from "./standard.css";

export const baseButton = style({
  padding: `${Spacing.small} ${Spacing.medium}`,
  borderRadius: "8px",
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
    backgroundColor: Colors.StatusYellow,
    color: Colors.FontPrimary,
    ":hover": {
      backgroundColor: Colors.StatusLightYellow,
    },
  },
]);

export const blueButton = style([
  baseButton,
  {
    backgroundColor: Colors.StatusBlue,
    color: Colors.FontSecondary,
    ":hover": {
      backgroundColor: Colors.StatusLightBlue,
    },
  },
]);

export const greenButton = style([
  baseButton,
  {
    backgroundColor: Colors.StatusGreen,
    color: Colors.FontSecondary,
    ":hover": {
      backgroundColor: Colors.StatusLightGreen,
    },
  },
]);

export const purpleButton = style([
  baseButton,
  {
    backgroundColor: Colors.StatusPurple,
    color: Colors.FontSecondary,
    ":hover": {
      backgroundColor: Colors.StatusLightPurple,
    },
  },
]);

export const iconStyle = style({
  marginLeft: Spacing.xsmall,
  fontSize: FontSize.Small,
});
