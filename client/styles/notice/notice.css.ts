import { style } from "@vanilla-extract/css";
import { greenButton } from "../templatebutton.css";
import { flexcolcontainer, centeredflexcolcontainer, centeredflexrowcontainer } from "../standardcontainer.css";
import { Colors, FontSize, Size, Spacing } from "../standard.css";
import { base20Text, base15Text, bold24Text } from "../standardtextsize.css";

export const uploadbutton = style({ textDecorationLine: "none" });

export const noticecontent = style([
  centeredflexcolcontainer,
  {
    backgroundColor: Colors.BackgroundDefault,
    height: '70vh',
    justifyContent: 'flex-start'
  }
])
export const title = style([
  centeredflexrowcontainer,bold24Text, // 여기에 추가
  {
    color: Colors.FontPrimary,
    width: '80vw',
  },
]);
export const noticelengh = style([
  centeredflexrowcontainer, // 여기에 추가
  {
    color: Colors.FontPrimary,
    fontSize: FontSize.Huge,
    width: '80vw',
  },
])
export const noticetext = style([base20Text]);

export const TagSize = style({
  width:"10vw",
  textAlign:'center'
});

export const pTagTitle = style({
  width:"50vw",
  textAlign:'center'
})

export const page = style({
  textAlign: 'center'
})

export const footer = style({
  textAlign: 'right',
})

export const writeButton = style([
  centeredflexcolcontainer,{
    alignItems:"flex-end"
  }
])

export const wrtiePage = style([
  flexcolcontainer,centeredflexcolcontainer,{
    height:'70vh',
    width:'100vw'
  }
])

export const checksize = style([
  flexcolcontainer,centeredflexcolcontainer,{
    width: '60.3vw',
    height:'10vh',
  }
])

export const inputSize = style({
  width:'50vw',
  height:'6vh',
  fontSize:'2vw',
  textAlign:'center'
})

export const textareaSize = style({
  width:'60vw',
  height:'55vh',
  fontSize:'1vw',
})

export const testsize = style([
  flexcolcontainer,centeredflexcolcontainer,{
    width: '60.3vw',
    height:'55vh',
  }
])

export const btnsize = style([
  flexcolcontainer,centeredflexcolcontainer,{
    width: '60.3vw',
    height:'10vh',
    alignItems:'flex-end'
  }
])