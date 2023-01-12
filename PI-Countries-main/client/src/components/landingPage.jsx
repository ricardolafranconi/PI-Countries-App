
import {React} from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';



const LandingPage = () => {
    return (
        <div className = "landing-page">
            <p className = "landPage-title">Welcome to Countries of the World!</p>            
            <Link to="/countries">
                <button className="btn-landPage">Enter</button>
            </Link>
        </div>
    )
}


export default LandingPage;