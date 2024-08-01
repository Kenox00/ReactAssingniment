import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function Country() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef();

  const getCountry = async (name) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      setCountries(response.data);
      setErrorMessage('');
    } catch (error) {
      console.log(error);
      setCountries([]);
      setErrorMessage('Country not found. Please try again.');
    }
  };

  const handleSearch = () => {
    const searchValue = inputRef.current.value.trim().toLowerCase();
    if (searchValue !== "") {
      setSearchTerm(searchValue);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      getCountry(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="container">
      <h1>Country Search</h1>

      <div className="search">
        <input type="text" ref={inputRef} placeholder="Search a country" />
        <button onClick={handleSearch}>Search</button>
      </div>

      {errorMessage && <div className="error">{errorMessage}</div>}

      <div className="image">
        {countries.map((country) => (
          <img key={country.cca3} src={country.flags.png} alt={country.flags.alt} />
        ))}
      </div>

      <div className="information">
        <ul>
          {countries.map((country) => {
            const languages = country.languages ? Object.values(country.languages).join(', ') : "no language";
            return (
              <li key={country.cca3}>
                <strong>Country:</strong> {country.name.common}<br />
                <strong>Capital:</strong> {country.capital}<br />
                <strong>Population:</strong> {country.population.toLocaleString()}<br />
                <strong>Region:</strong> {country.region}<br />
                <strong>Common Languages:</strong> {languages}<br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
