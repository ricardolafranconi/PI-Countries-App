import React,{useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {postActivity, getActivities, getCountries} from '../actions/index';
import s from '../styles/CreateActivity.module.css';

export default function ActivityCreate() {                                          
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.allCountries)    //useSelector para traerme el estado de mi store
    const history = useHistory();                                   //useHistory para poder redirigirme a otra ruta, esto funciona como un push        
    const [errors, setErrors] = useState({                          //estado local para guardar los errores                  
        enablebutton: true,                                         //si hay errores, el botón se deshabilita    
    }); //estado local vacío para mostrar errores
    
    useEffect(() => {                                               //useEffect para que se ejecute una vez que se renderiza el componente
        dispatch(getCountries())
    }, [dispatch]);

    const [input, setInput] = useState({                            //estado local para guardar los datos que voy a enviar al back
        name: "",
        difficulty: "",
        duration: "",
        season: [],
        countries: [],                                              //lo seteo en un array para tener la posibilidad de poner más de una
    });
    
    function validate() {                                           //función para validar los datos que voy a enviar al back
        let errors = {};                                            //objeto vacío para guardar los errores
        if (!input.name) {                                          //input es mi estado local, si en mi estado local no existe un name
            errors.name = "Activity name is required";              //en mi objeto errors voy a pner un string que diga "nombre requerido"
        } else if (!input.difficulty) {
            errors.difficulty = "Difficulty level is required";     //si no existe un difficulty en mi estado local, voy a poner un string que diga "dificultad requerida"
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
    const thereAreErrors = Object.values(errors).some((error) => error);        // esta variable me va a devolver true si hay errores, y false si no hay errores

    function handleChange(e) {                                                  //función para manejar los cambios en los inputs
        setInput({                                                              //seteo mi estado local con los valores que voy ingresando en los inputs    
            ...input,                                                           //spread operator para que no se pierdan los valores que ya estaban en el estado local
            [e.target.name]: e.target.value                                     //e.target.name es el name del input, y e.target.value es el valor que estoy ingresando en el input            
        });
        setErrors(                                                              //seteo mi estado local de errores con la función validate
            validate({                                                          //le paso como argumento mi estado local    
                ...input,                                                       //spread operator para que no se pierdan los valores que ya estaban en el estado local
                [e.target.name]: e.target.value,                                //e.target.name es el name del input, y e.target.value es el valor que estoy ingresando en el input            
            })                                                                  //la función validate me va a devolver un objeto con los errores
        );                                                                      //si no hay errores, el objeto va a estar vacío    
        console.log(input)                                                      //si hay errores, el objeto va a tener como keys los nombres de los inputs, y como values los errores    
    }
    // eslint-disable-next-line
    // function handleCheck(e) {
    //     if (e.target.checked) {
    //         setInput({
    //             ...input,
    //             season: e.target.value
    //         })
    //     }
    // }

    function handleSelectCountries(e) {
        if (!input.countries.includes(e.target.value)) {                //si el array de countries no incluye el valor que estoy seleccionando
            setInput({                                                  //entonces voy a setear mi estado local con el valor que estoy seleccionando de esta manera 
                ...input,                               
                countries: [...input.countries, e.target.value]
            })
        }
    }

    function handleDelete(d) {                                              //función para manejar el click en el botón de eliminar
        const newInput = {                                                  //guardo en una variable el nuevo estado local  
            ...input,                                                       //spread operator para que no se pierdan los valores que ya estaban en el estado local
            countries: input.countries.filter((country) => country !== d),  //en el array de countries, voy a filtrar los países que sean diferentes al que estoy eliminando
        };                                                                  //el filter me va a devolver un array con los países que no son iguales al que estoy eliminando
        setInput(newInput);                                                 //seteo mi estado local con el nuevo estado local
        setErrors(validate(newInput));                                      //seteo mi estado local de errores con la función validate
    }

    function handleSubmit(e) {                                              //función para manejar el submit del formulario
        e.preventDefault();                                                 //prevengo el comportamiento por defecto del formulario    
        setErrors(validate(input));                                         //seteo mi estado local de errores con la función validate
        const errorCompletarFormu = validate(input);                        //guardo en una variable el objeto que me devuelve la función validate
             
        if (Object.values(errorCompletarFormu).length !== 0 || !input.countries) {      //si el objeto que me devuelve la función validate no está vacío
            Object.values(errorCompletarFormu).forEach(error => alert(error));          //recorro el objeto y muestro los errores       
        }
       
        
        else {
            console.log(input, input.countries);
            dispatch(postActivity(input));
            alert("Activity created");                                           //ya se creó la actividad llevame a ver si está creado - vuelve solo a home
            history.push("/countries");                                         //redirecciono a la ruta /countries con useHistory
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
                    {errors.name && <p className={s.display2}>{errors.name}</p>}
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
                    {errors.difficulty && <p className={s.display2}>{errors.difficulty}</p>}
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
                    {errors.duration && <p className={s.display2}>{errors.duration}</p>}
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
                        {errors.season && <p className={s.display2}>{errors.season}</p>}
                    </select>
                </div>

                <label className={s.display}>Country</label>
                <select name="countries" onChange={(e) => handleSelectCountries(e)}
                    value=""
                >
                    <option value={""}>
                        {" "}
                        --Select one or more countries--
                    </option>
                    {countries
                        .filter((country) => (!input.countries.includes(country.id)))                   //filtro por todo lo que no sea ese elemento
                        .sort((a, b) => a.name.localeCompare(b.name))                                   //ordeno alfabeticamente
                        .map((country) => (                                                             //muestro los paises
                            <option value={country.id}>{country.name}</option>                          //value es el id del pais    
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



