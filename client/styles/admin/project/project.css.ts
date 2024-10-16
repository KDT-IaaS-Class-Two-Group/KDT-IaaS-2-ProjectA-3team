import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../../standard.css";
import { bold15Text } from "client/styles/standardtextsize.css";
export const projectTable = style({
  width: "100%",
  borderCollapse: "collapse",
});

export const projectTableHeader = style({
  backgroundColor: Colors.BackgroundSecondary,
  color: Colors.FontSecondary,
  padding: Spacing.small,
  textAlign: "center",
});

export const projectTableCell = style({
  padding: Spacing.small,
  textAlign: "center",
  border: "1px solid lightgray",
});
export const projectitletext = style([
  bold15Text,
  {
    color: Colors.FontSecondary,
  },
]);
