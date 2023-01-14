import { React } from "react";
import { Link } from "react-router-dom";
import s from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getCountries,
  getActivities,
  filterByContinent,
  orderByName,
  orderByPopulation,
  filterByActivity,
} from "../actions/index";
import Card from "./Card.jsx";
import Paginated from "./Paginated";
import { useState } from "react";
import SearchBar from "./Searchbar.jsx";

//render a list of countries and their details 9 per page
const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  function handleFilterContinent(e) {
    e.preventDefault();
    console.log(countries);
    if (e.target.value === "x") {
      dispatch(getCountries());
    }
    dispatch(filterByContinent(e.target.value));
    setCurrentPage(1);
  }

  function handleOrderAlphabet(e) {
    e.preventDefault();
    console.log(countries);
    if (e.target.value === "x") {
      dispatch(getCountries());
    }
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleOrderPopulation(e) {
    e.preventDefault();
    console.log(countries);
    if (e.target.value === "x") {
      dispatch(getCountries());
    }
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  const handlefilterByActivities = (e) => {
    e.preventDefault();
    if (e.target.value === "x") {
      dispatch(getCountries());
    }
    dispatch(filterByActivity(e.target.value));
    setCurrentPage(1);
  };

  return (
    
    <div className={s.background}>
      <p className={s.title}>Explore the countries of the world!</p>

      <select className={s.containerfilters} onChange={handleOrderAlphabet}>
        <option value="x">Order by name</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      <select className={s.containerfilters} onChange={handleOrderPopulation}>
        <option value="x">Order by population</option>
        <option value="min">Lower population</option>
        <option value="max">Higher population</option>
      </select>

      <select className={s.containerfilters} onChange={handleFilterContinent}>
        <option value="x">Continent</option>
        <option value="All">All</option>
        <option value="Asia">Asia</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Africa">Africa</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      <select
        className={s.containerfilters}
        onChange={handlefilterByActivities}
      >
    
        <option value="All" disable="selected hidden">
          Turistic Activities
        </option>
        {activities?.map((activity, index) => (
          <option key={index} value={activity.name}>
            {activity.name}
          </option>
        ))}
      </select>

      <button className={s.containerfilters} onClick={handleClick}>
        RESET
      </button>

      <Link to="/activities">
        {" "}
        <button className={s.cAct}>Create activity!</button>{" "}
      </Link>

      <SearchBar />
      <div className={s.cards}>
        {currentCountries &&
          currentCountries.map((country) => {
            return (
              <div className={s.card}>
                <Card
                  name={country.name}
                  flag={country.flag}
                  continent={country.continent}
                  id={country.id}
                />
              </div>
            );
          })}
      </div>

      <Paginated
        countriesPerPage={countriesPerPage}
        allCountries={countries.length}
        paginated={paginated}
      />
    </div>
   
  );
};

export default Home;

