import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";

export const mainpagecontainer = style({
  display: "flex",
  height: "100vh",
  backgroundColor: Colors.BackgroundSecondary,
  justifyContent: "flex-start",
  alignItems: "stretch",
});

export const contentcontainer = style({
  flex: 1,
  overflowY: "auto",
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateRows: "repeat(12, 1fr)",
  padding: "0vw 1vw 1vw 1vw",
  borderRadius: Size.border,
});
export const usercontentcontainer = style({
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateRows: "repeat(12, 1fr)",
  padding: "0vw 1vw 1vw 1vw",
  borderRadius: Size.border,
});
export const maincontentcontainer = style({
  gridColumn: "span 12",
  gridRow: "span 11",
  display: "grid",
  gap: "1.5rem",
  borderRadius: Size.border,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: Colors.FontPrimary,
  borderRadius: Size.border,
  padding: "0.25rem 1rem",
});

export const projectSection = style({
  gridColumn: "span 7",
  gridRow: "span 4",
});

export const buttonSection = style({
  gridColumn: "span 12",
  gridRow: "span 1",
  display: "flex",
  justifyContent: "space-around",
});

export const title = style({
  fontSize: FontSize.Large,
  marginBottom: Spacing.small,
});

export const cardHeader = style({
  fontSize: FontSize.Medium,
  fontWeight: "bold",
  marginBottom: Spacing.small,
});

export const cardContent = style({
  fontSize: FontSize.Small,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const button = style({
  backgroundColor: Colors.StatusBlue,
  color: Colors.StatusWhite,
  padding: `${Spacing.small} ${Spacing.medium}`,
  borderRadius: Spacing.xsmall,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  marginTop: Spacing.small,
  ":hover": {
    backgroundColor: Colors.StatusLightBlue,
  },
});

export const projectHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: Spacing.small,
});

export const projectTitle = style({
  display: "flex",
  alignItems: "center",
  gap: Spacing.small,
  justifyContent: "space-between",
  paddingTop: "0.18rem",
});

export const proceedingButton = style({
  padding: `${Spacing.xxsmall} ${Spacing.small}`,
  borderRadius: Spacing.xsmall,
  backgroundColor: Colors.StatusYellow,
  color: Colors.StatusWhite,
  fontSize: FontSize.Small,
  display: "flex",
  alignItems: "center",
  gap: Spacing.xxsmall,
});

export const allTasksContainer = style({
  display: "flex",
  alignItems: "center",
  gap: Spacing.xxsmall, // 버튼 간의 간격 추가
});

export const allTasksButton = style({
  padding: `${Spacing.xxsmall} ${Spacing.small}`,
  borderRadius: Spacing.xsmall,
  backgroundColor: Colors.StatusBlue,
  color: Colors.StatusWhite,
  fontSize: FontSize.Small,
  display: "flex",
  alignItems: "center",
  gap: Spacing.xxsmall,
  cursor: "pointer",
  ":hover": {
    backgroundColor: Colors.StatusLightBlue,
  },
});

export const dropdownButton = style({
  padding: `${Spacing.xxsmall} ${Spacing.small}`,
  borderRadius: Spacing.xsmall,
  backgroundColor: Colors.StatusBlue,
  color: Colors.StatusWhite,
  fontSize: FontSize.Small,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  ":hover": {
    backgroundColor: Colors.StatusLightBlue,
  },
});

export const externalLinkButton = style({
  padding: `${Spacing.xxsmall} ${Spacing.small}`,
  borderRadius: Spacing.xsmall,
  backgroundColor: Colors.StatusBlue,
  color: Colors.StatusWhite,
  fontSize: FontSize.Small,
  cursor: "pointer",
  opacity: 0.5, // 불투명하게 설정
  ":hover": {
    backgroundColor: Colors.StatusLightBlue,
    opacity: 1, // 호버 시 투명도 제거
  },
});

export const participantAvatars = style({
  display: "flex",
  gap: Spacing.xsmall,
});

export const participantAvatar = style({
  width: "2rem",
  height: "2rem",
  borderRadius: "50%",
  backgroundColor: Colors.StatusYellow,
});
