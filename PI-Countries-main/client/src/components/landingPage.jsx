
import {React} from 'react';
import { Link } from 'react-router-dom';
import s from '../styles/LandingPage.module.css';



const LandingPage = () => {
    return (
        <div className = {s.background}>
            <p className = {s.title}>Welcome to Countries of the World!</p>            
            <Link to="/countries">
                <button className={s.btnlandPage}>Hop on Board!</button>
            </Link>
        </div>
    )
}


export default LandingPage;