const express = require('express');
const path = require('path')
const router = express.Router();
const { Country } = require('../db.js');
const axios = require('axios');
  
const getApi = async () => {
    try {
      //traigo los paises de la api usando una variable y guardandola alli
      let countries = (await axios.get("https://restcountries.com/v3/all")).data;  
      //recorro el array de paises y los guardo en la base de datos
      //creo un array de promesas, cada promesa es un pais para que se guarden todos los paises en la base de datos 
      countries = await Promise.all(       
        //recorro el array de paises 
        countries.map(async (country) => {      
          //si el pais no tiene bandera, le asigno una bandera por defecto
          //en una primera version del codigo, si el pais no tenia bandera, no se guardaba en la base de datos
          //me tiraba error, por eso le asigne una bandera por defecto                                     
          if (typeof country.flags[0] === "undefined") {                
           
            country.flags[0] = "";                      //si el pais no tiene bandera, la bandera por defecto es una cadena vacia
          }
          return Country.findOrCreate({                 //busco el pais en la base de datos, si no esta lo creo
            where: {                                    //busco el pais por su codigo
              id: country.cca3,
              name: country.name.common,
              flag: country.flags[0],
              continent: country.continents[0],
              capital: country.capital ? country.capital[0] : "not found",      //si el pais no tiene capital, le asigno "not found"
              subregion: country.subregion ? country.subregion : "not found",
              area: country.area,
              population: country.population,
            },
          });
        })
      );
      console.log("countries loaded");                                        //si se cargaron los paises, imprimo en consola "countries loaded"

  
      
    } catch (error) {
        console.log(error);
    }
    };
    
  

module.exports = {
    getApi
}








  
  










//    ;
// ;

  


   
