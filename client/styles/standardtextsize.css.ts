import { style } from "@vanilla-extract/css";
import { Colors, FontSize, Spacing, Size } from "./standard.css";

export const base48Text = style({
  fontSize: FontSize.XXLarge,
});

export const base32Text = style({
  fontSize: FontSize.XLarge,
});

export const base24Text = style({
  fontSize: FontSize.Huge,
});

export const base20Text = style({
  fontSize: FontSize.Large,
});

export const base15Text = style({
  fontSize: FontSize.Medium,
});

export const base12Text = style({
  fontSize: FontSize.Small,
});

export const base5Text = style({
  fontSize: FontSize.Tiny,
});

export const bold48Text = style([
  base48Text,
  {
    fontWeight: "bold",
  },
]);

export const bold32Text = style([
  base32Text,
  {
    fontWeight: "bold",
  },
]);

export const bold24Text = style([
  base24Text,
  {
    fontWeight: "bold",
  },
]);

export const bold20Text = style([
  base20Text,
  {
    fontWeight: "bold",
  },
]);

export const bold15Text = style([
  base15Text,
  {
    fontWeight: "bold",
  },
]);

export const bold12Text = style([
  base12Text,
  {
    fontWeight: "bold",
  },
]);

export const bold5Text = style([
  base5Text,
  {
    fontWeight: "bold",
  },
]);
