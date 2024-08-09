import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../../standard.css";
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

export const projectTableRow = style({
  borderBottom: `1px solid ${Colors.BackgroundSecondary}`,
});

export const projectTableCell = style({
  padding: Spacing.small,
});
