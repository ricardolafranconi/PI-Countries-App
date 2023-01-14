//card component to render information from each country
import React from 'react';

import { NavLink } from 'react-router-dom'; 
import s from '../styles/Card.module.css';


export default function Card({ name, flag, continent, id}) {
    return (
        <div className = {s.background}>
            <img className={s.img}src={flag} alt="Img not found" width='200px' height='250px'/>
            <h3 className={s.card-name}>{name}</h3>
            <h5 className={s.card-continent}>{continent}</h5>
            <NavLink to={`/countries/${id}`}>
                <button className={s.btn}>Details</button>
            </NavLink>
        </div>
    );
}

