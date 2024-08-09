import { style } from "@vanilla-extract/css";
import { greenButton } from "../templatebutton.css";
import { flexcolcontainer } from "../standardcontainer.css";
import { base20Text } from "../standardtextsize.css";
export const uploadbutton = style({ textDecorationLine: "none" });
export const title = style({
  display: "flex",
});
export const noticetext = style([base20Text]);
