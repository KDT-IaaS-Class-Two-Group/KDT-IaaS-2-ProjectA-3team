import { style } from "@vanilla-extract/css";

export const mainContentAll = style({
  display: "flex",
  flexDirection: "column",
});

export const mainContentHeader = style({
  display: "flex",
  justifyContent: "space-between",
  flexDirection : "column"
});



export const mainFavorites = style({
  display: "flex",
});

export const mainFavoritPeople = style({
  display: "flex",
  justifyContent: "space-evenly",
  border: "1px solid",
  height: "8vh",
});

export const mainFriend = style({
  display: "flex",
  gap: "10px",
  border: "1px solid",
});

export const mainFriendDetail = style({
  display: "flex",
  gap: "10px",
  border: "1px solid",
});

export const mainProjectKanban = style({
  gridRow: "1 / 3",
  gridColumn: "1 / 3",
  border: "1px solid",
});

export const mainProjectStatus = style({
  gridRow: "1 / 4",
  gridColumn: "3 / 4",
  border: "1px solid",
});

export const mainProjectContent = style({
  display: "grid",
  gridTemplateRows: "repeat(4, 1fr)",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
});
export const calendarTile = style({
  height: "2.5rem", // 각 날짜 타일의 높이 조정
});
export const mainProjectCalender = style({
  gridRow: "3 / 5",
  gridColumn: "1 / 2",
  border: "1px solid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "auto", // 내용이 컨테이너를 초과할 때 스크롤 추가
  maxWidth: "100%", // 부모 요소의 너비에 맞춤
  maxHeight: "300px", // 캘린더의 최대 높이 설정
  boxSizing: "border-box",
  padding: "10px",
});

export const mainProjectToDo = style({
  gridRow: "3 / 5",
  gridColumn: "2 / 3",
  border: "1px solid",
});

export const mainProjectPlus = style({
  gridRow: "4 / 5",
  gridColumn: "3 / 4",
  border: "1px solid",
});

export const mainProjectDetail = style({
  display: "flex",
  height: "80%",
  justifyContent: "space-evenly",
});
