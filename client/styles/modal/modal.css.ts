import { style } from '@vanilla-extract/css';

export const modalBackdrop = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
});

export const modalContent = style({
  color: 'black',
  backgroundColor: '#e2e7f7',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '800px',
  height: '500px',
});

export const closeButton = style({
  border: 'solid 1px',
  fontSize: '1.5rem',
});
