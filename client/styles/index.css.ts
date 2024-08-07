import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "./standard.css";
//검회색 div 배경 지정 및 flex col cen
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
//배경 안 검정 div 배경 flex col cen
export const backcontainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: Colors.FontPrimary,
  padding: "10vw 15vw",
  borderRadius: "1.5vw",
});
//로고 div 부모 flex col cen
export const login = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: Size.full,
  marginBottom: Spacing.medium,
  gap: Spacing.medium,
});
//로고 div 부모 flex col cen
export const loginsub = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: Size.full,
  marginBottom: Spacing.medium,
  gap: Spacing.medium,
});

//로고 글자 스타일 DelaN
export const heading = style({
  fontSize: FontSize.XXLarge,
  color: Colors.FontSecondary,
  marginBottom: Spacing.large,
});
//여러 버튼 부모 flex col cen
export const buttoncontainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: Spacing.small,
});

//버튼 스타일
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

//input 스타일
export const input = style({
  padding: Spacing.medium,
  border: "1px solid #ccc",
  borderRadius: Size.border,
  width: "18vw",
});
//로그인 시 sign in 글씨 스타일
export const signfont = style({
  fontSize: FontSize.Large,
  color: Colors.FontThrid,
  fontWeight: "bold",
  display: "flex",
  padding: "0",
  marginTop: "0",
});
//로그인 id pw 글씨 스타일
export const idpwfont = style({
  fontSize: FontSize.Medium,
  color: Colors.FontSecondary,
  display: "flex",
  fontWeight: "bold",
  marginBottom: Spacing.small,
});
