/* SidebarStyles.css */
import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Spacing, ViewHeightSpacing } from "./standard.css";

export const mainpagecontainer = style({
  display: "flex",
  height: "100vh",
  backgroundColor: Colors.BackgroundDefault,
  justifyContent: "flex-start",
  alignItems: "stretch",
});

export const sidebarcontainer = style({
  width: "13.5vw",
  backgroundColor: Colors.FontPrimary,
  padding: `${Spacing.xxsmall} ${Spacing.medium}`,
  display: "flex",
  flexDirection: "column",
  color: Colors.FontSecondary,
  minHeight: "100vh",
});

export const logocontainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  margin: Spacing.medium,
});

export const logocontent = style({
  display: "flex",
  alignItems: "center",
});

export const logoimage = style({
  marginRight: Spacing.small,
});

export const logotext = style({
  fontSize: FontSize.XXLarge,
  fontWeight: "bold",
});

export const logounderline = style({
  width: "90%",
  height: "1px",
  backgroundColor: Colors.FontSecondary,
  marginTop: Spacing.small,
  alignSelf: "center",
});

export const profilecontainer = style({
  backgroundColor: "#2e2e2e",
  borderRadius: "8px",
  padding: Spacing.medium,
  marginBottom: Spacing.medium,
  flexShrink: 0 /* 요소의 축소를 방지 */,
  height: "32vh",
});

export const profile = style({
  width: "24vh",
  height: "10vh",
  borderRadius: "2vh",
  background: "gray",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row", // 수평 정렬
  marginBottom: Spacing.medium,
});

export const profilecircle = style({
  width: "5vh",
  height: "5vh",
  borderRadius: "50%",
  backgroundColor: Colors.StatusLightYellow,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: Spacing.small,
});

export const profilename = style({
  fontSize: FontSize.Medium,
  color: Colors.FontSecondary,
  flex: 1,
});

export const menuicon = style({
  marginRight: Spacing.small,
  color: Colors.Icon,
});

export const menulist = style({
  listStyleType: "none",
  padding: 0,
  margin: 0,
  flexGrow: 1 /* 요소의 확장을 허용 */,
});

export const menuitem = style({
  marginBottom: Spacing.medium,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: `${ViewHeightSpacing.xxsmall}${ViewHeightSpacing.xsmall}`,
  borderRadius: "8px",
  ":hover": {
    backgroundColor: "#3a3a3a",
  },
  fontSize: FontSize.Small /* 아이콘과 텍스트 크기 축소 */,
});

export const menuitemicon = style({
  marginRight: Spacing.small,
  fontSize: FontSize.Small /* 아이콘 크기 축소 */,
});

export const userlistcontainer = style({
  backgroundColor: "#2e2e2e",
  borderRadius: "8px",
  padding: Spacing.medium,
  color: Colors.FontSecondary,
  flexShrink: 0 /* 요소의 축소를 방지 */,
  height: "40vh",
});

export const userlisttitle = style({
  fontSize: FontSize.Medium /* 텍스트 크기 축소 */,
  marginBottom: Spacing.small,
  textAlign: "center",
});

export const searchcontainer = style({
  display: "flex",
  alignItems: "center",
  marginBottom: Spacing.small,
  backgroundColor: "#1e1e1e",
  padding: Spacing.small,
  borderRadius: "8px",
});

export const searchinput = style({
  padding: Spacing.small,
  borderRadius: "4px",
  border: "none",
  backgroundColor: "transparent",
  color: Colors.FontSecondary,
  flex: 1,
  outline: "none",
  fontSize: FontSize.Small /* 입력 텍스트 크기 축소 */,
});

export const userlist = style({
  listStyleType: "none",
  padding: 0,
  margin: 0,
});

export const userlistitem = style({
  display: "flex",
  alignItems: "center",
  marginBottom: Spacing.small,
  gap: Spacing.small,
  fontSize: FontSize.Small /* 텍스트 크기 축소 */,
});

export const userlistitemavatar = style({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  backgroundColor: Colors.StatusLightYellow,
});

export const userstatus = style({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  marginLeft: "auto",
});
