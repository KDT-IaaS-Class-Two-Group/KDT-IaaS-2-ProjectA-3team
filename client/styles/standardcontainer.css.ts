import { style } from "@vanilla-extract/css";
import { Colors, Spacing, Size, ViewHeightSpacing } from "./standard.css";
// flex column container (세로 정렬)
export const flexcolcontainer = style({
  display: "flex",
  flexDirection: "column",
});

// flex row container (가로 정렬)
export const flexrowcontainer = style({
  display: "flex",
  flexDirection: "row",
});

// centered flex column (세로 중앙 정렬)
export const centeredflexcolcontainer = style([
  flexcolcontainer,
  {
    alignItems: "center",
    justifyContent: "center",
  },
]);

// centered flex row (가로 중앙 정렬)
export const centeredflexrowcontainer = style([
  flexrowcontainer,
  {
    alignItems: "center",
    justifyContent: "center",
  },
]);

export const centerbetweenflexrowcontainer = style([
  flexrowcontainer,
  {
    alignItems: "center",
    justifyContent: "space-between"
  }
])