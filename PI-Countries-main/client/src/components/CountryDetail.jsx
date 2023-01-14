
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail, cleanDetails } from "../actions/index";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import s from '../styles/Detail.module.css'

export default function Detail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    let detailsCountry = useSelector(state => state.details)
    let details = detailsCountry;

    useEffect(() => {
        dispatch(getCountryDetail(id))

        return () => dispatch(cleanDetails())
    }, [id, dispatch])
    return (

        details ?
        <div className={s.backgroundDetail}>
            <div className={s.detail}>
                
                <div className={s.info} >
                    <div className={s.div1}>

                    <img className={s.img} src={details.flag} alt="img not found" />
                    </div>
                    <div className={s.div1}>
                        <h1 className={s.name}>{details.name}</h1>
                        <h5 className={s.data1}>ID: {details.id}</h5>
                        <h5 className={s.data1}>CAPITAL: {details.capital}</h5>
                        <h5 className={s.data1}>SUBREGION: {details.subregion}</h5>
                        <h5 className={s.data1}>AREA: {details.area} km2</h5>
                        <h5 className={s.data1}>POPULATION: {details.population}</h5>
                    </div>

                    <div className={s.div1}>
                            {details.activities?.length > 0 ? details.activities.map((a) =>
                                <div className={s.div3}>
                                    <h5 className={s.data3}>ACTIVITIES: </h5>
                                    <h3 className={s.data3}>{a.name}</h3>
                                    <h4 className={s.data3}>Difficulty: {a.difficulty}</h4>
                                    <h4 className={s.data3}>Duration: {a.duration}</h4>
                                    <h4 className={s.data3}>Season: {a.season}</h4>
                                </div>
                            ) : "No activities"
                            }
                        <Link to='/countries'>
                            <button className={s.btn2}>Go home</button>
                        </Link>
                    </div>


                    </div>
               

        </div>
    </div>  : <p>Loading...</p>
    )

                        }











