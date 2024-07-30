import { style } from "@vanilla-extract/css";

// user.tsx css부분
export const mainPage = style({
  display:'flex',
  width:"100vw",
  height:"100vh"
})
export const mainLeft =style({
  width:"15%",
  height:"100vh"
})

export const mainContent = style ({
  width:"80%",
  height:"100vh"
})

// userLeftContent.tsx css부분
export const leftAllContentFooter = style({
  display:'flex',
  flexDirection:'column',
  gap:'30px',
})
export const leftHeader = style({
  display:"flex",
  gap:"20px",
  border:"1px solid"
})

export const leftHeaderIcon = style({
  alignContent:"center"
})

export const leftContent = style({
  border : '1px solid',
  padding:'10px',
  display:'flex',
  gap:'10px',
  flexDirection:'column'
})

export const leftContentName = style({
  display:'flex',
  border:'1px solid',
  gap:'5px'
})

export const leftContentList = style({
  display:'flex'
})

export const leftContentIconList = style({
  listStyleType:"none",
  padding: '5px',
  margin: 0
})

export const leftContentTextList = style({
  listStyleType:"none",
  padding: '5px',
  margin: 0
})

export const leftContentNotiList = style({
  listStyleType:"none",
  padding: '5px',
  margin: 0
})

export const listItem = style({
  marginBottom:'10px'
})

export const leftFooter = style({
  display:'flex',
  flexDirection:'column',
  border : '1px solid',
  padding:'10px',
  justifyContent:'center',
  alignItems:'center',
  height : '60vh'
})

export const leftFooterTitle = style({
  textAlign:'center'
})

export const leftFooterSearch = style({
  display:'flex',
  backgroundColor:'gray',
  width:'13vw',
  height:'3vh',
  gap:'3px',
  alignItems:'center'
})

export const leftFooterManager = style({
  display:'flex',
  flexDirection:'column',
  border:'1px solid',
  width:'13vw',
  alignItems:'center'
})

export const leftFooterManagerTitle = style({
  display:'flex'
})

export const Managerstar = style({
  alignContent:'center'
})

export const leftFooterUser = style({
  display:'flex',
  flexDirection:'column',
  border:'1px solid',
  width:'13vw',
  alignItems:'center'
})

export const leftFooterUserTitle = style({
  display:'flex'
})

export const UserStar = style({
  alignContent:'center'
})