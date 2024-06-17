import MultiRangeSlider from '@components/range-slider';
import styles from './style.module.css';
import { FormEvent } from 'react';

type FilterProps = {
  setFilter: (param: string[] | []) => void;
};

function Filter({ setFilter }: FilterProps) {
  type stateFormType = {
    duration?: {
      min: number;
      max: number;
    };
    price?: {
      min: number;
      max: number;
    };
    level?: string;
  };

  const stateForm: stateFormType = {};

  const changeDuration = (param: { min: number; max: number }) => {
    stateForm.duration = {
      min: param.min,
      max: param.max,
    };
  };

  const changePrice = (param: { min: number; max: number }) => {
    stateForm.price = {
      min: param.min,
      max: param.max,
    };
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const level = Object.fromEntries(formData).level as string | undefined;

    const filter = [];

    level && filter.push(`variants.attributes.level.key:"${level}"`);
    stateForm.duration?.max &&
      filter.push(
        `variants.attributes.duration:range (${stateForm.duration?.min} to ${stateForm.duration?.max})`,
      );
    stateForm.price?.max &&
      filter.push(
        `variants.price.centAmount:range (${stateForm.price?.min * 100} to ${stateForm.price?.max * 100})`,
      );

    setFilter(filter);
  };

  const resetHandler = () => {
    setFilter([]);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.filter} onSubmit={submitHandler}>
        <div className={styles.level}>
          <span className={styles.title}>Level:</span>
          <label htmlFor="easy">
            Easy
            <input type="radio" id="easy" value="easy" name="level" />
          </label>
          <label htmlFor="medium">
            Medium
            <input type="radio" id="medium" value="medium" name="level" />
          </label>
          <label htmlFor="hard">
            Hard
            <input type="radio" id="hard" value="hard" name="level" />
          </label>
        </div>
        <div className={styles.duration}>
          <span className={styles.title}>Duration:</span>
          <MultiRangeSlider min={0} max={20} onChange={changeDuration}></MultiRangeSlider>
        </div>
        <div className={styles.price}>
          <span className={styles.title}>Price:</span>
          <MultiRangeSlider min={0} max={40} onChange={changePrice}></MultiRangeSlider>
        </div>
        <button className={styles.button} type="submit">
          Show
        </button>
        <button className={styles.button} type="reset" onClick={resetHandler}>
          Reset
        </button>
      </form>
    </div>
  );
}

export default Filter;
