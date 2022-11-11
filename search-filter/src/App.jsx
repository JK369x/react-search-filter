import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json()) //! res.json จะได้มาเป็น promiss
      .then((data) => {
        setCountries(data);
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="search-container">
          <label htmlFor="search-form">
            <input type="text" className="search-input" placeholder="search..."/>
          </label>
        </div>
        <ul className="row">
          {countries.map((country, index) => {
            return (
              <li key={index}>
                <div className="card">
                  <div className="card-title">
                    <img src={country.flags.svg} alt={country.name.common} />
                  </div>
                  <div className="card-body">
                    <div className="card-description">
                      <h2>{country.name.common} </h2>
                      <ol className="card-list">
                        <li>people :<span>{country.population}</span></li>
                        <li>region : <span>{country.region}</span></li>
                        <li>capital :<span>{country.capital}</span></li>
                      </ol>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
