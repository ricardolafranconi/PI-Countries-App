const { Country } = require('../db.js');
const { Activity } = require('../db.js');
const { Router } = require('express');
const router = Router();
const { Op } = require("sequelize");
const axios = require('axios');
const cors = require('cors')

router.use(cors({origin: 'http://localhost:3000'}))      //habilita el cors para que el front pueda hacer las request

router.get('/countries', async (req, res, next) => {    //ruta para traer todos los paises
  const { name } = req.query;                           //desestructura el query para ver si tiene un nombre
                                                        // aca hice dos rutas en una, si el query tiene un nombre, busca el pais por ese nombre
                                                        // si no tiene nombre, trae todos los paises
                                                        // en el front, si el query tiene un nombre, se hace la request con el query
                                                        // si no tiene nombre, se hace la request sin el query                        
  try {
      if (name) {
          const countries = await Country.findAll({         //busca el pais por el nombre
            attributes: ["name", "flag", "continent", "id", "capital", "subregion", "area", "population"],  //trae solo estos atributos
      
              where: {                                  //busca el pais por el nombre
                  name: {                                        
                      [Op.iLike]: `%${name}%`           //busca el nombre del pais, sin importar si es mayuscula o minuscula
                  }                                     //el % es para que busque el nombre del pais, sin importar si esta al principio o al final de la palabra    
              }                                         //ejemplo: si el pais es argentina, busca argentina, argentin, argentinia, etc        
          });                                           // si no encuentra el pais, devuelve un array vacio    
          return res.status(200).send(countries);
      }
      const countries = await Country.findAll({                             //si no tiene nombre, trae todos los paises
        attributes: ["name", "flag", "continent", "population", "id"],      //trae solo estos atributos
          include: Activity                                                 //incluye las actividades
      });
      res.status(200).send(countries);                                      //devuelve los paises
  } catch (error) {
      next(error)
  }
});



router.get('/countries/:id', async (req, res, next) => {                //ruta para traer un pais por su id
    const id = req.params.id.toUpperCase();                             //desestructura el id de la ruta y lo pasa a mayuscula para que coincida con la base de datos
                                                                        // en la base de datos, los id de los paises estan en mayuscula    
    try {                                                               
        const countryId = await Country.findByPk(id, {                 //busca el pais por su id con el metodo findByPk de sequelize     
            include: Activity                                          //incluye las actividades 
        });                                                            // si no encuentra el pais, devuelve null
        res.status(200).send(countryId)                                //devuelve el pais 
    } catch (error) {
        next(error)
    }
})

router.get('/activities', async (req, res, next) => {                   //ruta para traer todas las actividades
    try {                                                               //busca todas las actividades con el metodo findAll de sequelize
        const activities = await Activity.findAll({                     
        include: Country                                                //incluye el pais al que pertenece la actividad
        });
        res.status(200).send(activities);
    } catch (error) {
        next(error)
    }
});


router.post('/activities', async (req, res, next) => {                  //ruta para crear una actividad
    try {                                                               //desestructura el body del request para obtener los datos de la actividad
        const {                                                         //countries es un array de strings    
            name,                                                       //ejemplo: ["Argentina", "Chile"]
            difficulty,                                                 //el front debe enviar el array de strings con los nombres de los paises
            duration,
            season,
            countries
        } = req.body;                   //countries es un array de strings
                                        //

        if (!name || !difficulty || !duration || !season || !countries) {   //si falta algun dato, devuelve un error
            return res.status(400).send("Information is missing");          // si no hay error, crea la actividad
        }
        let newActivity = await Activity.create({                           //crea la actividad con el metodo create de sequelize
            name,                                                           //el metodo create devuelve la actividad creada
            difficulty,
            duration,
            season,
        });
        countries.forEach(async (country) => {                              //recorre el array de strings con los nombres de los paises, es async porque usa await
                                                                            // usa await para que espere a que termine de buscar el pais para agregarlo a la actividad
            let activityCountry = await Country.findOne({                   //busca el pais por su nombre con el metodo findOne de sequelize
                where: {                                                    //activityCountry es un objeto con el pais encontrado
                    id: country                                             // sirve para agregar el pais a la actividad
                }                                                       
            })                                                          
            await newActivity.addCountry(activityCountry)               //agrega el pais a la actividad con el metodo addCountry de sequelize
        })
        res.status(200).send("Activity has been succesfully created")
     
    } catch (error) {
        next(error)
        res.status(400).send("Could not create activity")
    }
});


module.exports = router;

