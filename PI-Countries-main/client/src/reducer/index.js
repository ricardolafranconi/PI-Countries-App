

const initialState = {
    countries: [],
    allCountries: [],
    details: [],
    allActivities: [],
    activities: [],
}

function rootReducer(state = initialState, action) {

    switch(action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,                
                allCountries: action.payload,
                countries: action.payload
            }
            
        
    
        case 'GET_COUNTRY_BY_NAME':
            return {
                ...state,
                countries: action.payload
            }

        case 'FILTER_BY_CONTINENT':
            const allCountries4 = state.allCountries
            const continentFiltered = action.payload === 'All' ? allCountries4 :
                allCountries4.filter(el => el.continent === action.payload)
            return {
                ...state,
                countries: continentFiltered
            }



        case 'FILTER_BY_ACTIVITY':
            const countries2 = state.allCountries
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
                action.payload === "asc" ? state.allCountries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (b.name > a.name) {
                        return -1
                    }
                    return 0
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
                action.payload === "min" ? state.allCountries.sort(function (a, b) {
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

