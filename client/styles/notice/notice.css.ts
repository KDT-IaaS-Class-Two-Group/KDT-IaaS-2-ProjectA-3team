import { style } from "@vanilla-extract/css";
import { greenButton } from "../templatebutton.css";
import {
  flexcolcontainer,
  centeredflexcolcontainer,
  centeredflexrowcontainer,
  flexrowcontainer,
} from "../standardcontainer.css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";
import {
  base20Text,
  bold32Text,
  bold24Text,
  bold20Text,
} from "../standardtextsize.css";

export const uploadbutton = style({ textDecorationLine: "none" });

export const noticecontent = style([
  centeredflexcolcontainer,
  {
    backgroundColor: Colors.BackgroundAlt,
    height: "63vh",
    justifyContent: "flex-start",
    borderRadius: Size.border,
  },
]);
export const title = style([
  centeredflexrowcontainer,
  bold24Text, // 여기에 추가
  {
    color: Colors.FontPrimary,
    width: "70vw",
  },
]);
export const noticelengh = style([
  centeredflexrowcontainer, // 여기에 추가
  {
    color: Colors.FontPrimary,
    fontSize: "1.25rem",
    width: "70vw",
  },
]);
export const noticetext = style([base20Text]);

export const TagSize = style({
  width: "10vw",
  textAlign: "center",
});

export const pTagTitle = style({
  width: "50vw",
  textAlign: "center",
});
export const pTagTitletext = style({
  width: "50vw",
  ":hover": {
    color: Colors.StatusBlue,
  },
});

export const page = style({
  textAlign: "center",
});

export const footer = style({
  textAlign: "right",
});

export const writeButton = style([
  centeredflexcolcontainer,
  {
    alignItems: "flex-end",
    marginTop: "0.5vw",
  },
]);

export const wrtiePage = style([
  flexcolcontainer,
  centeredflexcolcontainer,
  {
    height: "70vh",
    width: "100vw",
  },
]);

export const checksize = style([
  flexcolcontainer,
  centeredflexcolcontainer,
  {
    width: "60.3vw",
    height: "10vh",
  },
]);

export const inputSize = style({
  width: "50vw",
  height: "5vh",
  fontSize: "1.5rem",
  textAlign: "center",
});

export const textareaSize = style({
  width: "60vw",
  height: "55vh",
  fontSize: "1.25rem",
});

export const testsize = style([
  flexcolcontainer,
  centeredflexcolcontainer,
  {
    width: "60.3vw",
    height: "55vh",
  },
]);

export const btnsize = style([
  flexcolcontainer,
  centeredflexcolcontainer,
  {
    marginTop: "2.5vh",
    alignItems: "flex-end",
    marginRight: "5vw",
    marginBottom: "2.5vh",
  },
]);

export const sujungbtn = style([
  flexrowcontainer,
  centeredflexcolcontainer,
  {
    width: "60.3vw",
    height: "10vh",
    justifyContent: "flex-end",
  },
]);

export const authnotice = style([
  centeredflexcolcontainer,
  {
    backgroundColor: Colors.BackgroundSecondary,
    paddingBottom: "10vh",
    alignItems: "flex-end",
  },
]);

export const authnoticetitle = style([
  centeredflexrowcontainer,
  bold32Text,
  {
    height: "5vh",
    width: "100%",
    paddingBottom: "1vw",
    borderBottom: "1px solid white",
  },
]);

export const authfooter = style([
  flexrowcontainer,
  {
    justifyContent: "flex-end",
    height: "5vh",
    width: "100vw",
  },
]);

export const authnoticecontent = style([
  centeredflexrowcontainer,
  bold20Text,
  {
    width: "100vw",
    height: "60vh",
    borderRadius: Size.border,
  },
]);

export const usernoticeall = style([centeredflexcolcontainer]);

export const usernotcietitle = style([
  centeredflexrowcontainer,
  bold32Text,
  {
    height: "5vh",
  },
]);

export const usernoticecontent = style([centeredflexrowcontainer]);

export const usercontent = style([
  centeredflexrowcontainer,
  bold20Text,
  {
    width: "45vw",
    textAlign: "center",
    height: "60vh",
  },
]);
export const usercomment = style([
  flexcolcontainer,
  {
    width: "45vw",
    height: "50vh",
    justifyContent: "flex-start",
    marginTop: "30px",
  },
]);

export const commentcreate = style([
  centeredflexrowcontainer,
  {
    width: "100%",
    gap: "10px",
    margin: "2vw 0vw",
  },
]);

export const commenttext = style({
  width: "30vw",
});

export const commentcontent = style([centeredflexcolcontainer]);

export const commentinnercontent = style([centeredflexcolcontainer]);

export const comment = style([
  base20Text,
  {
    width: "35vw",
  },
]);

export const commentbtn = style([
  centeredflexrowcontainer,
  {
    justifyContent: "flex-end",
    width: "35vw",
    gap: "1vw",
  },
]);
export const authcontentdiv = style({
  border: "1px solid black",
  borderRadius: Size.border,
  backgroundColor: Colors.BackgroundDefault,
  marginBottom: "0.8vh",
});
export const usercontentdiv = style({
  border: "1px solid black",
  borderRadius: Size.border,
  backgroundColor: Colors.BackgroundDefault,
});
export const pagebutton = style({
  marginTop: "1vw",
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
  backgroundColor: Colors.StatusLightYellow,
  color: Colors.FontPrimary,
  ":hover": {
    backgroundColor: Colors.StatusYellow,
  },
});
export const noticetextleft = style({
  textAlign: "left",
  marginRight: "1vw",
  marginTop: "1vw",
});
export const noticecolor = style({ backgroundColor: Colors.FontPrimary });
export const greenbackBtn = style([
  greenButton,
  {
    marginTop: "1vw",
  },
]);
export const btnright = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});
export const usermainwrite = style([
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
]);
export const vw50 = style({ width: "50vw" });
export const usermaintext = style({
  alignSelf: "center",
});
export const followerlist = style({
  fontSize: "1.5rem",
  textAlign: "center",
  lineHeight: "13vh",
  height: "12vh",
});
