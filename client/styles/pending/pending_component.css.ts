import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
});

export const contentWrapper = style({
  marginBottom: '15px',
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

export const content = style({
  marginBottom: '10px',
  fontSize: '16px',
  color: 'white',
  border : 'solid 1px'
});

export const button = style({
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
  marginTop: '10px',
  
  ':hover': {
    backgroundColor: '#0056b3',
  },
  
  ':active': {
    backgroundColor: '#004494',
  },
  
  ':focus': {
    outline: '2px solid #0056b3',
    outlineOffset: '2px',
  },
});
