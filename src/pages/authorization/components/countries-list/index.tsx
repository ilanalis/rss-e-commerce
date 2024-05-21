import { FC } from 'react';

export interface CountriesListProps {
  title: string;
  id: string;
}

const CountriesList: FC<CountriesListProps> = ({ title, id }) => {
  return (
    <>
      <label htmlFor={id}>{title}</label>
      <select id={id}>
        <option value="US">US</option>
        <option value="DE">DE</option>
        <option value="NL">NL</option>
        <option value="RU">RU</option>
      </select>
    </>
  );
};

export default CountriesList;
