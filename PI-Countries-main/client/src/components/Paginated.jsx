
//create a new component called Paginated
//this component will be used to render the countries in pages
//this component will be used in Home.jsx

//this component will be used to render the countries in pages
//this component will be used in Home.jsx

import React from 'react';
import './Paginated.css';
import s from '../styles/Paginated.module.css';

export default function Paginated({ countriesPerPage, allCountries, paginated }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className={s.paginated}>
                {pageNumbers && pageNumbers.map(number => (
                    <li className={s.container_button} onClick={() => paginated(number)} key={number}>
                        <button className={s.button}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

