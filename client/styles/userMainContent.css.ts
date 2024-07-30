import { style } from "@vanilla-extract/css";

export const mainContentAll = style({
  display:'flex',
  flexDirection:'column'
})

export const mainContentHeader = style({
  display:'flex',
  justifyContent:'space-between',
})

export const mainFavorites = style({
  display:'flex'
})

export const mainFavoritPeople = style({
  display:'flex',
  justifyContent:'space-evenly',
  border:'1px solid'
})

export const mainProjectContent = style({
  display:'grid',
  gridTemplateColumns:'repeat(3, 1fr)',
  gridTemplateRows:'repeat(4, 1fr)',
  height:'80vh'
})

export const mainProjectKanban = style({
  gridRow: '1 / 3',
  gridColumn: '1 / 3',
})

export const mainProjectStatus = style({
  gridRow: '1 / 4',
  gridColumn: '3 / 4',
})

export const mainProjectCalender = style({
  gridRow: '3 / 5',
  gridColumn: '1 / 2',
})

export const mainProjectToDo = style({
  gridRow: '3 / 5',
  gridColumn: '2 / 3',
})

export const mainProjectPlus = style({
  gridRow: '4 / 5',
  gridColumn: '3 / 4',
})