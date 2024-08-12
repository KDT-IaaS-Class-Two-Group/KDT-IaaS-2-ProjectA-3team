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
});


export const astyle = style({
  textDecoration: "none",
  backgroundColor: Colors.StatusYellow,
  fontSize: FontSize.Medium,
  color : Colors.FontPrimary,
});
