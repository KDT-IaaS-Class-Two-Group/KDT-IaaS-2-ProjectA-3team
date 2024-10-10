import { style } from "@vanilla-extract/css";
import { Colors, Size } from "client/styles/standard.css";
export const ProjectInfoSection = style({
  width: "77vw",
  height: "85vh",
  display: "grid",
  gridTemplateColumns: "1fr 4fr",
  gridTemplateAreas: "'a b'",
  backgroundColor: Colors.FontPrimary,
  borderRadius: Size.border,
  // overflow : "auto",
});
