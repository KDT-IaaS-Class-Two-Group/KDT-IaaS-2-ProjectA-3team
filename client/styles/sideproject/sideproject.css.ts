import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";

export const maincontainter = style({
  backgroundColor: Colors.FontPrimary,
  width: Size.full,
  height: Size.full,
  borderRadius: Size.border,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});

export const center = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const baseButton = style({
  padding: `${Spacing.small} ${Spacing.medium}`,
  border: "none",
  borderRadius: Size.border,
  fontSize: FontSize.Medium,
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s ease",
});

export const blueButton = style([
  baseButton,
  {
    backgroundColor: Colors.StatusLightBlue,
    color: Colors.FontSecondary,
    marginTop: Spacing.small,
    ":hover": {
      backgroundColor: Colors.StatusBlue,
    },
  },
]);
export const table = style({
  marginTop: "2vw",
  borderCollapse: "collapse",
  width: "60vw",
  borderStyle: "none",
  borderRadius: Size.border,
});

export const thstyle = style({
  padding: "10px",
  backgroundColor: Colors.StatusGreen,
  borderStyle: "none",
});
export const secondthstyle = style({
  backgroundColor: Colors.BackgroundSecondary,
  padding: "10px",
  borderStyle: "none",
});
export const tbodystyle = style({
  padding: "10px",
  borderStyle: "none",
});
export const tdstyle = style({
  padding: "12px 15px", // 패딩 조정
  textAlign: "center",
  fontSize: FontSize.Medium,
  backgroundColor: Colors.BackgroundSecondary,
  borderBottom: Colors.StatusGreen,
  borderBottomStyle: "hidden",
});
