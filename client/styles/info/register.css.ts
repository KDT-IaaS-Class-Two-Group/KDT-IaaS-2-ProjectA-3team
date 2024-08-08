// styles.css.ts
import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";

export const registerForm = style({
  display: "flex",
  flexDirection: "column",
  width: "400px", // 너비 고정
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  alignItems: "stretch",
  color: Colors.FontSecondary, // 폰트 색상 설정
});

export const formGroup = style({
  marginBottom: "15px",
});

export const label = style({
  display: "block",
  marginBottom: "5px",
  fontSize: FontSize.Medium,
  fontWeight: "bold",
  textAlign: "left",
  paddingLeft: "1.25vw",
});

export const input = style({
  width: "90%",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "16px",
  backgroundColor: Colors.BackgroundAlt, // 입력 필드 배경색 설정
  color: Colors.FontPrimary, // 입력 필드 폰트 색상 설정
});

export const buttonLink = style({
  fontWeight: "bold",
  background: Colors.FontThrid, // 버튼 배경색 설정
  border: "none",
  color: Colors.FontSecondary, // 버튼 폰트 색상 설정
  cursor: "pointer",
  padding: Spacing.medium,
  fontSize: FontSize.Medium,
  margin: Spacing.medium,
  borderRadius: "4px", // 모서리 둥글게
  width: "100%",
  textAlign: "center", // 텍스트 중앙 정렬
  ":hover": {
    background: Colors.StatusBlue, // 호버 시 배경색 변경
  },
});

export const signInText = style({
  textAlign: "center",
  fontSize: FontSize.Small,
  color: Colors.FontThrid,
  marginTop: Spacing.medium,
});

export const signInLink = style({
  color: Colors.StatusBlue,
  textDecoration: "none",
  fontWeight: "bold",
  ":hover": {
    textDecoration: "underline",
  },
});
