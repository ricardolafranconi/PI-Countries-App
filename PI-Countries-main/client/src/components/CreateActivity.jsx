import React,{useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {postActivity, getActivities, getCountries} from '../actions/index';
import s from '../styles/CreateActivity.module.css';

export default function ActivityCreate() {
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.allCountries)
    const history = useHistory();
    const [errors, setErrors] = useState({
        enablebutton: true,
    }); //estado local vacío para mostrar errores
    
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: [],
        countries: [], //lo seteo en un array para tener la posibilidad de poner más de una
    });
    
    function validate() {
        let errors = {};
        if (!input.name) {
            //input es mi estado local, si en mi estado local no existe un name
            errors.name = "Activity name is required"; //en mi objeto errors voy a pner un string que diga "nombre requerido"
        } else if (!input.difficulty) {
            errors.difficulty = "Difficulty level is required";
        } else if (input.difficulty < 1 || input.difficulty > 5) {
            errors.difficulty = "Invalid difficulty level (1-5)";
        } else if (!input.duration) {
            errors.duration = "Duration of the activity required";
        } else if (input.duration > 120 && input.duration < 1) {
            errors.duration = "Invalid duration (1min - 120min)";
        } else if (input.season.length === 0) {
            errors.season = "Season of the required activity";
        } else if (input.countries.length === 0) {
            errors.countries = "Country/countries required";
        }
        return errors;
    }
    // eslint-disable-next-line
    const thereAreErrors = Object.values(errors).some((error) => error);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );

    }
    // eslint-disable-next-line
    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                season: e.target.value
            })
        }
    }

    function handleSelectCountries(e) {
        if (!input.countries.includes(e.target.value)) {
            setInput({
                ...input,
                countries: [...input.countries, e.target.value]
            })
        }
    }

    function handleDelete(d) {
        const newInput = {
            ...input,
            countries: input.countries.filter((country) => country !== d), //filtro por todo lo que no sea ese elemento
        };
        setInput(newInput);
        setErrors(validate(newInput));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validate(input));
        const errorCompletarFormu = validate(input);
        if (Object.values(errorCompletarFormu).length !== 0 || !input.countries) {
            alert("All fields must be required");
        } else {
            console.log(input, input.countries);
            dispatch(postActivity(input));
            alert("Activity created");
            //ya se creó la actividad llevame a ver si está creado - vuelve solo a home
            history.push("/countries");
        }
    }


    return (
        <div className={s.form}>
            <div className={s.volver}>
                <Link to='/countries'><button>Back home</button></Link>
            </div>
            <h1 className={s.title}>Create your activity!!!</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={s.formulario}>
                <div>
                    <label className={s.display}>Name:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        placeholder="Activity name"
                        required />
                </div>
                <div>
                    <label className={s.display}>Difficulty:</label>
                    <select
                        name="difficulty"
                        value={input.difficulty}
                        className=""
                        onChange={e => handleChange(e)}
                    >
                        <option value="">Select difficulty</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        {errors.difficulty && <p className="error">{errors.difficulty}</p>}
                    </select>

                </div>
                <div>
                    <label className={s.display}>Duration in minutes:</label>
                    <input
                        type="number"
                        value={input.duration}
                        name="duration"
                        autoComplete="off"
                        min="1"
                        max="120"
                        onChange={e => handleChange(e)}
                    />
                    {errors.duration && <p className="error">{errors.duration}</p>}
                </div>

                <div>
                    <label className={s.display}>Season</label>
                    <select
                        value={input.season}
                        name="season"
                        onChange={e => handleChange(e)}
                    >
                        <option value="">Select season</option>
                        <option value="Summer">Summer</option>
                        <option value="Autumn">Autumn</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                        {errors.season && <p className="error">{errors.season}</p>}
                    </select>
                </div>

                <label className={s.display}>Country</label>
                <select name="countries" onChange={(e) => handleSelectCountries(e)}
                    value=""
                >
                    <option value={""} disable selected hidden>
                        {" "}
                        --Select one or more countries--
                    </option>
                    {countries
                        .filter((country) => (!input.countries.includes(country.id)))
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((country) => (
                            <option value={country.id}>{country.name}</option>
                        ))}
                </select>
                <div>
                    {input.countries.map(country => (
                        <span>
                            {countries.find((c) => c.id === country).name}
                            <button type="button" onClick={() => handleDelete(country)}>x</button>
                        </span>
                    ))}
                </div>
                <div>
                    <button type="Submit" className={s.submit}>Create</button>
                </div>
            </form>
        </div>
    )

}



