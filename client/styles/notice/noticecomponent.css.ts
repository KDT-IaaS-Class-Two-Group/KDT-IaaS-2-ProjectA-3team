import { style } from "@vanilla-extract/css";
import { greenButton } from "../templatebutton.css";
import {
  flexcolcontainer,
  centeredflexcolcontainer,
  centeredflexrowcontainer,
  flexrowcontainer,
} from "../standardcontainer.css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";
export const noticeheaderdiv = style([
  flexrowcontainer,
  {
    gap: "1vw",
    justifyContent: "space-between",
    alignItems: "center",
  },
]);
