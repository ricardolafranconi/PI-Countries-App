//card component to render information from each country
import React from 'react';

import { NavLink } from 'react-router-dom'; 
import './Card.css'


export default function Card({ name, flag, continent, id}) {
    return (
        <div className = "home-card">
            <img className="card-image"src={flag} alt="Img not found" width='200px' height='250px'/>
            <h3 className="card-name">{name}</h3>
            <h5 className="card-continent">{continent}</h5>
            <NavLink to={`/countries/${id}`}>
                <button className='card-btn'>Details</button>
            </NavLink>
        </div>
    );
}

