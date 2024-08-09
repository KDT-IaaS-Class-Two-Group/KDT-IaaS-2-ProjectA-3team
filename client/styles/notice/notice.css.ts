import { style } from "@vanilla-extract/css";
import { greenButton } from "../templatebutton.css";
import { centerbetweenflexrowcontainer, centeredflexcolcontainer, flexrowcontainer } from "../standardcontainer.css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";
import { base20Text, base15Text, base48Text } from "../standardtextsize.css";
export const uploadbutton = style({ textDecorationLine: "none" });


export const noticelengh = style([
  flexrowcontainer
])

export const noticecontent = style([
  centeredflexcolcontainer
])
export const title = style([
  centerbetweenflexrowcontainer, // 여기에 추가
  {
    color: Colors.FontThrid,
    fontSize: FontSize.Huge
  },
]);
export const noticetext = style([base20Text]);
