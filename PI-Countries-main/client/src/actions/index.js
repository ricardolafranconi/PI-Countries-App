import axios from 'axios';

export function getCountries() {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/countries");
            return dispatch({
                type: 'GET_COUNTRIES',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getCountryByName(name) {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/countries?name=" + name);
            return dispatch({
                type: 'GET_COUNTRY_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterByContinent (payload) {
    return {
        type: 'FILTER_BY_CONTINENT',
        payload

        }
    }

export function filterByActivity (payload) {
    return {
        type: 'FILTER_BY_ACTIVITY',
        payload

        }
    }

export function orderByName (payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload

        }
    }

export function orderByPopulation (payload) {
    return {
        type: 'ORDER_BY_POPULATION',
        payload

        }
    }

 
export function getCountryDetail(id) {

    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/countries/" + id);
            return dispatch({
                type: 'GET_COUNTRY_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getActivities() {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/activities");
            return dispatch({
                type: 'GET_ACTIVITIES',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}


// export function postActivity(payload, countries) {
//     return async function (dispatch) {
//       // Add the countries array to the payload object
//       payload.countries = countries;
  
//       const response = await axios.post("http://localhost:3001/activities", payload);
//       return response.data;
//     }
//   }
  

export function postActivity(payload) {  //payload es el objeto que me llega por el formulario del front
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/activities", payload);
        // console.log(response);
        return response;
    }
};

export function cleanDetails() {
    return {
        type: 'CLEAN_DETAIL'
    }
}


