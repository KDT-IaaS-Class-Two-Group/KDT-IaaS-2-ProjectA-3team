import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../../standard.css";
import { centeredflexcolcontainer } from "client/styles/standardcontainer.css";
export const requestmaincontainer = style([
  centeredflexcolcontainer,
  {
    display: "flex",
    justifyContent: "space-between",

    flexDirection: "row",
    padding: "1vw 0.5vw 1vw 0vw",
  },
]);
const basetextcontainer = style({
  minWidth: "0.75vw",
  padding: "0.4vw 0.7vw",
  textAlign: "center",
  borderRadius: Size.border,
});
export const requestmaintext = style([
  basetextcontainer,
  {
    background: Colors.StatusBlue,
  },
]);
export const authmaintext = style([
  basetextcontainer,
  {
    background: Colors.StatusYellow,
  },
]);
