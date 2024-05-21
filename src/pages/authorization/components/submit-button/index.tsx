import { FC } from 'react';
import styles from './style.module.css';

export interface SubmitButtonProps {
  title: string;
  id: string;
  onButtonClick: () => void;
}

const SubmitButton: FC<SubmitButtonProps> = ({ title, id, onButtonClick }) => {
  return (
    <button id={id} className={styles.submitButton} type="submit" onClick={onButtonClick}>
      {title}
    </button>
  );
};

export default SubmitButton;
