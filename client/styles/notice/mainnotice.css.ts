import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";
import { runtext } from "../admin/greet/greet.css";
import { profilecontainer } from "../sidebar/SidebarStyles.css";
import { flexrowcontainer } from "../standardcontainer.css";
export const noticemaintext = style([
  runtext,
  {
    width: "auto",
    backgroundColor: Colors.FontPrimary,
    color: Colors.StatusLightYellow,
  },
]);
export const noticesubtext = style([
  runtext,
  {
    width: "auto",
    backgroundColor: Colors.FontPrimary,
    color: Colors.StatusGreen,
  },
]);
export const noticeboardsection = style([
  profilecontainer,
  {
    backgroundColor: Colors.FontPrimary,
    display: "flex",
    flexDirection: "row",
    gap: "1vw",
  },
]);
export const noticesection = style({
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  alignItems: "flex-start",
  textDecoration: "none",
  backgroundColor: Colors.BackgroundSecondary,
  borderRadius: Size.border,
  padding: Spacing.medium,
  gap: Spacing.small,
});
export const hovertextstyle = style([
  flexrowcontainer,
  {
    ":hover": {
      backgroundColor: Colors.FontPrimary,
      borderRadius: Size.border,
    },
  },
]);
export const paddingtop1vwstyle = style({
  paddingTop: "1vw",
});
