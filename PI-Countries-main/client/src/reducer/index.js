

const initialState = {   //estado inicial
    countries: [],       //iniciamos el estado del Redux Store con un array vacio   
    allCountries: [],    // y todos los objetos que vamos a necesitar   
    details: [],        // existe countries y allCountries porque necesitamos filtrar los paises por nombre, por alfabeto y por continente y que no se
    allActivities: [],  // pierdan los paises que ya estan en el array countries. Por eso, cuando filtramos por nombre, guardamos los paises
    activities: [],     // filtrados en countries y cuando filtramos por continente, guardamos los paises filtrados en countries y los paises    
}                       // que ya estaban en countries en allCountries. De esta manera, cuando filtramos por continente, no se pierden los 
                        // paises filtrados por nombre y viceversa.    

function rootReducer(state = initialState, action) {

    switch(action.type) {
        case 'GET_COUNTRIES':
            return {                                //devolvemos un nuevo estado con los paises que nos llegan en el payload
                ...state,                
                allCountries: action.payload,       //guardamos los paises en allCountries
                countries: action.payload           //guardamos los paises en countries
            }                   
    
        case 'GET_COUNTRY_BY_NAME':             //filtramos los paises por nombre
            return {
                ...state,
                countries: action.payload
            }

        case 'FILTER_BY_CONTINENT':
            const allCountries = state.allCountries
            const continentFiltered = action.payload === 'All' ? allCountries :     //filtramos los paises por continente
                allCountries.filter(el => el.continent === action.payload)          //si el continente es 'All', devolvemos todos los paises
            return {                                                                // usando el array allCountries y filter para filtrarlos
                ...state,
                countries: continentFiltered
            }



        case 'FILTER_BY_ACTIVITY':
            const countries2 = state.allCountries
            // filtramos los paises por actividad
            //usando filter para filtrar los paises que tengan la actividad que buscamos
            // (c) es cada pais del array countries2
            // (c) es cada actividad del array activities
            // retornamos los paises que tengan la actividad que buscamos
            // con find buscamos la actividad que buscamos en el array activities
            // si c.name es igual a la actividad que buscamos, retornamos el pais
            const countriesFiltered = countries2.filter((c) => { return c.activities?.find((c) => { return c.name === action.payload})}); 

            if (action.payload === "All") {
                return { ...state, 
                    countries: state.allCountries }
            } else {
                return {
                    ...state,
                    countries: countriesFiltered
                }
            }
        
            case 'GET_ACTIVITIES':
                return {
                    ...state,
                    activities: action.payload,
                    allActivities: action.payload
                }
        
            case 'ORDER_BY_NAME':
                action.payload === "asc" ? state.allCountries.sort(function (a, b) { //ordenamos los paises por nombre
                    if (a.name > b.name) {                                           //si el payload es 'asc', ordenamos de la A a la Z   
                        return 1                                                     //si el payload es 'desc', ordenamos de la Z a la A   
                    }                                                                //usando sort para ordenarlos, que funciona como un if   
                    if (b.name > a.name) {                                           //si a.name es mayor que b.name, retornamos 1, que seria que a.name va despues que b.name
                                                                                        // 1 es la posicion de a.name en el array ordenado  
                        return -1                                                    //si b.name es mayor que a.name, retornamos -1       
                    }                                                                //si a.name es igual que b.name, retornamos 0   
                    return 0                                                         //    
                }) :
                    state.allCountries.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1
                        }
                        if (b.name > a.name) {
                            return 1
                        }
                        return 0
                    })
                return {
                    ...state,
                    countries: state.allCountries
                }
            case 'ORDER_BY_POPULATION':
                action.payload === "min" ? state.allCountries.sort(function (a, b) {  //ordenamos los paises por poblacion
                    if (a.population > b.population) {
                        return 1
                    }
                    if (b.population > a.population) {
                        return -1
                    }
                    return 0
                }) :

                    state.allCountries.sort(function (a, b) {
                        if (a.population > b.population) {

                            return -1
                        }
                        if (b.population > a.population) {
                            return 1
                        }
                        return 0
                    })
                return {
                    ...state,
                    countries: state.allCountries
                }


                            
            case 'GET_COUNTRY_DETAIL':
                return {
                    ...state,
                    details: action.payload
                }

            case 'CLEAN_DETAIL':
                return {
                    ...state,
                    details: []

                }

            case 'POST_ACTIVITY':
                    return {
                        ...state,
                        activityCreated: action.payload
                    }

                    
                    default:
                        return state
                    }
                
}

                

            

            


export default rootReducer;

