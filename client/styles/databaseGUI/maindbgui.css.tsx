import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";
import { userlist, userlistitem } from "../sidebar/SidebarStyles.css";
import { baseButton, tdn } from "../templatebutton.css";
export const dblist = style([
  userlist,
  {
    display: "flex",
    gap: "1vw",
    justifyContent: "space-evenly",
  },
]);
export const dblistitem = style([
  userlistitem,
  {
    backgroundColor: Colors.StatusBlue,
    padding: "0.7vw",
    borderRadius: Size.border,
  },
]);
export const dbbuttonstyle = style([
  baseButton,
  tdn,
  {
    backgroundColor: Colors.StatusLightBlue,
    ":hover": {
      backgroundColor: Colors.StatusBlue,
    },
  },
]);
