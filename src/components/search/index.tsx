import { FormEvent } from 'react';
import styles from './style.module.css';

type SearchProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string[]>>;
};

function Search({ setSearchQuery }: SearchProps) {
  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const search = Object.fromEntries(formData).search as string;
    setSearchQuery([search]);
  };

  return (
    <form className={styles.search} onSubmit={submitHandler}>
      <input className={styles.input} type="text" name="search" placeholder="Search..." />
      <button className={styles.button}>Search</button>
    </form>
  );
}

export default Search;
