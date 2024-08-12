import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../../standard.css";
import { bold15Text } from "client/styles/standardtextsize.css";

export const databaseGUISection = style({
  gridColumn: "span 12",
  gridRow: "span 3",
});

export const maincontainter = style({
  backgroundColor: Colors.FontPrimary,
  width: Size.full,
  height: Size.full,
  borderRadius: Size.border,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});

export const ulliststlye = style({
  listStyle: "none",
  textDecoration: "none",
  display: "grid",
  gridTemplateColumns: "repeat(3, 22.5vw)",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});

export const astyle = style({
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  display: "block",
  textDecoration: "none",
  backgroundColor: Colors.StatusLightYellow,
  height: "5vh",
  margin: "10px",
  fontSize: "20px",
  color: Colors.FontPrimary,
  borderRadius: Size.border,
  paddingTop: "15px",
});
