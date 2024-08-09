import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  width: '100vw',
  height: '100vh',
  backgroundColor: '#171717',
});

export const contentContainer = style({
  display : 'flex', 
  width : '100%',
  flexDirection :'column'
})

export const teamInfoContainer = style({
  height : '40vh',
  border : 'solid 2px'
})