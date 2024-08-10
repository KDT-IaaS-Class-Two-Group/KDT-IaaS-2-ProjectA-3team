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
  // border : 'solid 2px'
})

export const ContainerBorder = style({
  border : 'solid 1px',
  borderRadius : '20px',
  height : '70vh',
  margin : '10px'
})


export const ContentHeader = style({
  display:'flex'
})





export const ProjectInfoSection = style({
  width : '90%',
  display :'grid',
  gridTemplateColumns :  '1fr 4fr'
})