// template.css.ts
import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "./standard.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: Colors.BackgroundSecondary,
  color: Colors.FontSecondary,
  textAlign: "center",
});

export const login = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: Size.full,
  marginBottom: Spacing.medium,
  gap: Spacing.medium,
});

export const backcontainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: Colors.FontPrimary,
  padding: "10vw 15vw",
  borderRadius: "1.5vw",
});

export const buttoncontainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: Spacing.small,
});

export const heading = style({
  fontSize: FontSize.XXLarge,
  color: Colors.FontSecondary,
  marginBottom: Spacing.large,
});

export const buttonLink = style({
  fontWeight: "bold",
  background: Colors.FontThrid,
  border: "none",
  color: Colors.FontSecondary,
  cursor: "pointer",
  padding: Spacing.medium,
  fontSize: FontSize.Medium,
  margin: Spacing.medium,
  borderRadius: Size.border,
  width: "20vw",
  ":hover": {
    background: Colors.StatusBlue,
  },
});

export const content = style({
  marginTop: Spacing.medium,
  padding: Spacing.medium,
  border: `1px solid ${Colors.Icon}`,
  borderRadius: Size.border,
  width: Size.full,
  maxWidth: "600px",
});
