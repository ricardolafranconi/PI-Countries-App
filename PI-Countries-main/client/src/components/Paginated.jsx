

import React from 'react';

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

