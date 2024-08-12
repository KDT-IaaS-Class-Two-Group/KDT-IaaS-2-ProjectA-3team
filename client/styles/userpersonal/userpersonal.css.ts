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
