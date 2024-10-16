/* SidebarStyles.css */
import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Spacing, ViewHeightSpacing } from "../standard.css";
export const maincontent = style({
  flexGrow: 1, // 남은 공간을 채우도록 설정
  padding: Spacing.medium, // 내부 여백 설정
  backgroundColor: Colors.BackgroundDefault, // 배경색 설정
  overflowY: "auto", // 세로 스크롤 허용
  height: "100%", // 전체 높이를 차지하도록 설정
});

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
  width: "4vw", // 화면 크기에 따라 로고 이미지 크기를 조절
  height: "4vw", // 화면 크기에 따라 로고 이미지 크기를 조절
  objectFit: "contain",
});

export const logotext = style({
  fontSize: "2vw",
  fontWeight: "bold",
});

export const logounderline = style({
  width: "90%",
  height: "1px",
  backgroundColor: "#2E2E2E",
  marginTop: Spacing.small,
  alignSelf: "center",
});

export const profilecontainer = style({
  backgroundColor: Colors.BackgroundSecondary,
  borderRadius: "8px",
  padding: Spacing.medium,
  marginBottom: Spacing.medium,
  flexShrink: 0 /* 요소의 축소를 방지 */,
  height: "auto", // 높이를 자동으로 설정
  flexDirection: "column",
});

export const profile = style({
  padding: Spacing.medium,
  borderRadius: "2vh",
  background: Colors.FontPrimary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row", // 수평 정렬
  marginBottom: Spacing.medium,
  gap: Spacing.small,
});

export const profilecircle = style({
  minWidth: "2vw",
  minHeight: "2vw",
  borderRadius: "50%",
  backgroundColor: Colors.StatusLightYellow,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const profilename = style({
  fontSize: "1vw",
  flex: "1 1 auto",
  color: Colors.FontSecondary,
  textAlign: "center",
  minWidth: "50%",
});

export const menuicon = style({
  marginRight: Spacing.small,
  color: "transparent",
});

export const menulist = style({
  listStyleType: "none",
  padding: 0,
  margin: 0,
  flexGrow: 1 /* 요소의 확장을 허용 */,
});

export const menuitem = style({
  color: "white",
  marginBottom: Spacing.medium,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "0.25vw",
  textDecoration: "none",
  borderRadius: "8px",
  ":hover": {
    color: Colors.StatusLightYellow,
  },
  fontSize: FontSize.Medium /* 아이콘과 텍스트 크기 축소 */,
});
export const atagmenuitem = style([
  menuitem,
  {
    padding: "0",
    margin: "0",
  },
]);
export const menuitemicon = style({
  marginRight: Spacing.small,
  fontSize: FontSize.Small /* 아이콘 크기 축소 */,
});

export const userlistcontainer = style({
  backgroundColor: Colors.BackgroundSecondary,
  borderRadius: "8px",
  padding: Spacing.medium,
  color: Colors.FontSecondary,
  flexShrink: 0 /* 요소의 축소를 방지 */,
  height: "47vh",
});

export const userlisttitle = style({
  fontSize: FontSize.Medium /* 텍스트 크기 축소 */,
  marginBottom: Spacing.small,
  textAlign: "center",
  fontWeight: "bold",
});

export const searchcontainer = style({
  display: "flex",
  alignItems: "center",
  marginBottom: Spacing.small,
  backgroundColor: Colors.FontPrimary,
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
  fontSize: "0.95rem" /* 입력 텍스트 크기 축소 */,
});

export const userlist = style({
  listStyleType: "none",
  margin: 0,
  padding: "0.5vw 1vw 0vw 1vw",
});

export const userlistitem = style({
  display: "flex",
  alignItems: "center",
  marginBottom: Spacing.small,
  gap: Spacing.small,
  fontSize: "1rem" /* 텍스트 크기 축소 */,
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
