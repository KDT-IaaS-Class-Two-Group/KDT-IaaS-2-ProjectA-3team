import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  // backgroundColor: "#f0f0f0",
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

export const input = style({
  marginBottom: '10px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
});

export const button = style({
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#0070f3',
  color: '#fff',
  cursor: 'pointer',
});
