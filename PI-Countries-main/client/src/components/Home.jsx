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


const Home = () => {                                                        //
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);                // useSelector es un hook que nos permite acceder al estado de la store
  const activities = useSelector((state) => state.activities);              // useDispatch es un hook que nos permite despachar acciones a la store
  const [order, setOrder] = useState("");                                   // useState es un hook que nos permite crear un estado local en un componente funcional
  const [currentPage, setCurrentPage] = useState(1);                        // en este caso estamos creando un estado local para la pagina actual
  const [countriesPerPage, setCountriesPerPage] = useState(9);              // y un estado local para la cantidad de paises por pagina
                                                                            // y un orden por defecto
  const indexOfLastCountry = currentPage * countriesPerPage;                // calculamos el indice del ultimo pais de la pagina actual, multiplicando la pagina actual por la cantidad de paises por pagina
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;        // calculamos el indice del primer pais de la pagina actual, restando el indice del ultimo pais de la pagina actual menos la cantidad de paises por pagina
  const currentCountries = countries.slice(                                 // creamos un array con los paises de la pagina actual utilizando slice para que solo se muestren los paises de la pagina actual
    indexOfFirstCountry,                                                    // que va desde el indice del primer pais de la pagina actual
    indexOfLastCountry                                                      // hasta el indice del ultimo pais de la pagina actual    
  );                                                                        //esto sirve para que solo se muestren los paises de la pagina actual

  const paginated = (pageNumber) => {                                       // funcion que nos permite cambiar de pagina, recibe como parametro el numero de pagina  
    setCurrentPage(pageNumber);                                             // y cambia el estado local de la pagina actual, con el numero de pagina recibido  
  };

  useEffect(() => {                                                        // useEffect es un hook que nos permite ejecutar codigo despues de que el componente se renderice 
    dispatch(getCountries());                                              // en este caso estamos despachando la accion getCountries para que se ejecute despues de que el componente se renderice     
    dispatch(getActivities());                                             // y despachando la accion getActivities para que se ejecute despues de que el componente se renderice
  }, [dispatch]);                                                          // el segundo parametro de useEffect es un array de dependencias, si este array esta vacio, el codigo se ejecutara solo una vez, si tiene dependencias, se ejecutara cada vez que una de las dependencias cambie 
                                                                            // en este caso estamos pasando dispatch como dependencia, para que se ejecute cada vez que dispatch cambie, dispatch podria cambiar si despachamos una accion que modifique el estado de la store
  function handleClick(e) {                                                 // funcion que se ejecuta cuando se hace click en el boton de RESET
    e.preventDefault();                                                     // evitamos que el boton haga un submit del formulario cuando se hace click
    dispatch(getCountries());
  }

  function handleFilterContinent(e) {                                           // funcion que se ejecuta cuando se hace click en el boton de filtrar por continente
    e.preventDefault();                                                     // evitamos que el boton haga un submit del formulario cuando se hace click
    console.log(countries);                                                 // submit significa que el navegador va a enviar los datos del formulario a un servidor, en este caso no queremos eso  
    if (e.target.value === "x") {                                           // no queremos eso porque no tenemos un servidor, y no queremos que el navegador haga un refresh de la pagina
      dispatch(getCountries());
    }
    dispatch(filterByContinent(e.target.value));                          // despachamos la accion filterByContinent, pasandole como parametro el valor del boton que se hizo click
    setCurrentPage(1);                                                    // cambiamos el estado local de la pagina actual a 1, para que se muestre la primera pagina
  }

  function handleOrderAlphabet(e) {                                       // funcion que se ejecuta cuando se hace click en el boton de ordenar por nombre
    e.preventDefault();                                                     // evitamos que el boton haga un submit del formulario cuando se hace click
    console.log(countries);                                               // submit significa que el navegador va a enviar los datos del formulario a un servidor, en este caso no queremos eso
    if (e.target.value === "x") {
      dispatch(getCountries());
    }
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);                                // cambiamos el estado local de la pagina actual a 1, para que se muestre la primera pagina
  }                                                                       // cambiamos el estado local de order, para que se muestre el orden actual

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
        {activities?.map((activity, index) => (                 // mapeamos el array de actividades, y creamos una opcion por cada actividad
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
          currentCountries.map((country) => {                 // mapeamos el array de paises, y creamos una card por cada pais
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

      <Paginated                                                // componente Paginated
        countriesPerPage={countriesPerPage}                     // le pasamos como props el numero de paises por pagina      
        allCountries={countries.length}                         // le pasamos como props el numero total de paises
        paginated={paginated}                                   // le pasamos como props la funcion paginated, que esta en el estado local  
      />
    </div>
   
  );
};

export default Home;

