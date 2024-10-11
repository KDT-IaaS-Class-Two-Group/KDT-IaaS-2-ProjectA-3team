// eslint-disable-next-line import/no-duplicates
import { style } from "@vanilla-extract/css";
// eslint-disable-next-line import/no-duplicates
import { globalStyle } from "@vanilla-extract/css";

export const ProjectInfoContainer = style({
  height: "100%",
  borderRadius: "20px",
  gridArea: "b",
});

export const ProjectHeaderContainer = style({
  padding: "20px",
  height: "20vh",
});

export const ListContainer = style({
  height: "50vh",
  overflow: "auto",
});
export const KanbanListContainer = style({
  height: "40vh",
  overflow: "auto",
});

globalStyle(`${KanbanListContainer}::-webkit-scrollbar`, {
  display: "none",
});

globalStyle(`${ListContainer}::-webkit-scrollbar`, {
  display: "none",
});

export const IssueContainer = style({
  backgroundColor: "#1e1e1e",
  width: "27vw",
  borderRadius: "20px",
  padding: "20px",
  margin: "20px 20px 20px 0px",
});
