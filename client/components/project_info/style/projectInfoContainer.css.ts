import { style } from "@vanilla-extract/css"
import { globalStyle } from "@vanilla-extract/css";


export const ProjectInfoContainer = style({
  height: '100%',
  borderRadius: '20px',
  gridArea: "b"
})

export const ProjectHeaderContainer = style({
  padding: "20px",
  height: "20vh"
})

export const ListContainer = style({
  height: "50vh",
  overflow: "auto",
})

globalStyle(`${ListContainer}::-webkit-scrollbar`, {
  display: 'none',
});

export const IssueContainer = style({
  backgroundColor : "#1e1e1e",
  width : "27vw",
  borderRadius : "20px",
  padding :"20px",
  margin : "20px 20px 20px 0px"
})