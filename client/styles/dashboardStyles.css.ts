import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "./standard.css";

export const mainpagecontainer = style({
  display: "flex",
  height: "100vh",
  backgroundColor: Colors.BackgroundSecondary,
  justifyContent: "flex-start",
  alignItems: "stretch",
});

export const contentcontainer = style({
  flex: 1,
  overflowY: "hidden",
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridTemplateRows: "repeat(12, 1fr)",
  gap: "1.5rem",
  padding: "0vw 1vw 1vw 1vw",
  borderRadius: Size.border,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: Colors.BackgroundAlt,
  borderRadius: Spacing.xsmall,
  padding: Spacing.small,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  overflow: "hidden",
});

export const fullRowSection = style({
  gridColumn: "span 12",
  gridRow: "span 1",
});

export const projectSection = style({
  gridColumn: "span 7",
  gridRow: "span 4",
});

export const requestSection = style({
  gridColumn: "span 5",
  gridRow: "span 2",
});

export const userManagementSection = style({
  gridColumn: "span 5",
  gridRow: "span 2",
});

export const attendanceSection = style({
  gridColumn: "span 6",
  gridRow: "span 4",
});

export const noticeBoardSection = style({
  gridColumn: "span 6",
  gridRow: "span 4",
});

export const databaseGUISection = style({
  gridColumn: "span 12",
  gridRow: "span 3",
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
  color: Colors.FontPrimary,
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

export const projectTable = style({
  width: "100%",
  borderCollapse: "collapse",
});

export const projectTableHeader = style({
  backgroundColor: Colors.BackgroundSecondary,
  color: Colors.FontSecondary,
  padding: Spacing.small,
  textAlign: "left",
});

export const projectTableRow = style({
  borderBottom: `1px solid ${Colors.BackgroundSecondary}`,
});

export const projectTableCell = style({
  padding: Spacing.small,
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
