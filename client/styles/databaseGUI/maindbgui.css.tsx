import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";
import { userlist, userlistitem } from "../sidebar/SidebarStyles.css";
export const dblist = style([
  userlist,
  {
    display: "flex",
    gap: "1vw",
  },
]);
export const dblistitem = style([
  userlistitem,
  {
    backgroundColor: "Red",
    padding: "0.5vw",
    borderRadius: Size.border,
  },
]);
