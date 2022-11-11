import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [word, setWord] = useState("");
  const [dataFilter] = useState(["name", "capital"]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json()) //! res.json จะได้มาเป็น promiss
      .then((data) => {
        setCountries(data);
      });
  }, []);
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const searchCountries = (countries) => {
    return countries.filter((item) => {
      return dataFilter.some((filter) => {
        if (item[filter]) {
          if (filter === "name") {
            return (
              item[filter].common
                .toString()
                .toLowerCase()
                .indexOf(word.toLowerCase()) > -1
            );
          } else {
            item[filter].toString().toLowerCase().indexOf(word.toLowerCase()) >
              -1;
          }
        }
      });
    });
  };
  return (
    <div className="App">
      <div className="container">
        <div className="search-container">
          <label htmlFor="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="search..."
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
          </label>
        </div>
        <ul className="row">
          {searchCountries(countries).map((country, index) => {
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
                        <li>
                          people :
                          <span>{formatNumber(country.population)}</span>
                        </li>
                        <li>
                          region : <span>{country.region}</span>
                        </li>
                        <li>
                          capital :<span>{country.capital}</span>
                        </li>
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
