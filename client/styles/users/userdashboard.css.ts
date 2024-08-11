import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";
export const usersection = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: Colors.FontPrimary,
  borderRadius: Size.border,
  padding: "0.5rem 1rem",
  margin: "0.5rem",
});

export const favsection = style({
  gridColumn: "span 4",
  gridRow: "span 2",
});

export const kanbansection = style({
  gridColumn: "span 8",
  gridRow: "span 5",
});
export const calendarsection = style({
  gridColumn: "span 4",
  gridRow: "span 6",
});
export const todolistsection = style({
  gridColumn: "span 4",
  gridRow: "span 4",
});
export const companybutton = style({
  gridColumn: "span 4",
  gridRow: "span 3",
});
export const usernoticesection = style({
  gridColumn: "span 4",
  gridRow: "span 4",
  display: "flex",
});
