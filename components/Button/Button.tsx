import React from 'react';
import Button from '@mui/material/Button';
import styles from './Button.module.scss';

type ButtonProps = {
  label: string;
  onClick: () => void;
};

const MyButton: React.FC<ButtonProps> = ({ label, onClick }) => (
  <Button className={styles.button} onClick={onClick}>
    {label}
  </Button>
);

export default MyButton;
