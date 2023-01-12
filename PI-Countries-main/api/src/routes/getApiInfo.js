const express = require('express');
const path = require('path')
const router = express.Router();
const { Country } = require('../db.js');
const axios = require('axios');
  
const getApi = async () => {
    try {
      let countries = (await axios.get("https://restcountries.com/v3/all")).data;
      countries = await Promise.all(
        countries.map(async (country) => {
          if (typeof country.flags[0] === "undefined") {
           
            country.flags[0] = "";
          }
          return Country.findOrCreate({
            where: {
              id: country.cca3,
              name: country.name.common,
              flag: country.flags[0],
              continent: country.continents[0],
              capital: country.capital ? country.capital[0] : "not found",
              subregion: country.subregion ? country.subregion : "not found",
              area: country.area,
              population: country.population,
            },
          });
        })
      );
      console.log("countries loaded");

  
      
    } catch (error) {
        console.log(error);
    }
    };
    
  

module.exports = {
    getApi
}








  
  










//    ;
// ;

  


   
