import { style } from "@vanilla-extract/css";
import { Size } from "client/styles/standard.css";
import { bold24Text } from "client/styles/standardtextsize.css";
import { blueButton } from "client/styles/templatebutton.css";
import { listinitial } from "client/styles/users/attendancestyle.css";

export const modalBackdrop = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
});

export const modalContent = style({
  color: "black",
  backgroundColor: "#e2e7f7",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: "800px",
  height: "500px",
});

export const closeButton = style({
  border: "solid 1px",
  fontSize: "1.5rem",
});
export const modalbtncontainer = style({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "10px",
});
export const projectmodalbtn = style([
  blueButton,
  {
    marginLeft: "1vw",
  },
]);
export const projectgap = style({
  paddingTop: "2vw",
});
export const teamlist = style([
  listinitial,
  bold24Text,
  {
    padding: "1vw",
  },
]);
export const projectpadding = style({
  padding: "1vw",
});
export const projectbackground = style({
  marginTop: "2.5vh",
  backgroundColor: "white",
  padding: "1vw 1.5vw",
  borderRadius: Size.border,
});
