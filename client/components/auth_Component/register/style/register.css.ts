import { style } from '@vanilla-extract/css';

export const registerForm = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
});

export const formGroup = style({
  marginBottom: '15px',
});

export const label = style({
  display: 'block',
  marginBottom: '5px',
  fontSize: '14px',
  fontWeight: 'bold',
});

export const input = style({
  width: '100%',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
});

export const button = style({
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: '#0056b3',
  },
});
