import { style, composeStyles } from "@vanilla-extract/css";
import { Colors, FontSize, Spacing, ViewHeightSpacing } from "./standard.css";

const baseButton = style({
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

const yellowButton = style({
  backgroundColor: Colors.StatusYellow,
  color: Colors.FontPrimary,
  ":hover": {
    backgroundColor: Colors.StatusLightYellow,
  },
});

const blueButton = style({
  backgroundColor: Colors.StatusBlue,
  color: Colors.FontSecondary,
  ":hover": {
    backgroundColor: Colors.StatusLightBlue,
  },
});

const greenButton = style({
  backgroundColor: Colors.StatusGreen,
  color: Colors.FontSecondary,
  ":hover": {
    backgroundColor: Colors.StatusLightGreen,
  },
});

const purpleButton = style({
  backgroundColor: Colors.StatusPurple,
  color: Colors.FontSecondary,
  ":hover": {
    backgroundColor: Colors.StatusLightPurple,
  },
});

export const yellowButtonStyle = composeStyles(baseButton, yellowButton);
export const blueButtonStyle = composeStyles(baseButton, blueButton);
export const greenButtonStyle = composeStyles(baseButton, greenButton);
export const purpleButtonStyle = composeStyles(baseButton, purpleButton);

const iconStyle = style({
  marginLeft: Spacing.xsmall,
  fontSize: FontSize.Small,
});

export const yellowButtonWithIcon = composeStyles(yellowButtonStyle, iconStyle);
export const blueButtonWithIcon = composeStyles(blueButtonStyle, iconStyle);
export const greenButtonWithIcon = composeStyles(greenButtonStyle, iconStyle);
export const purpleButtonWithIcon = composeStyles(purpleButtonStyle, iconStyle);
