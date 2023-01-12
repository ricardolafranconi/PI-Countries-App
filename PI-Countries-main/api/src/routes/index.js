const { Country } = require('../db.js');
const { Activity } = require('../db.js');
const { Router } = require('express');
const router = Router();
const { Op } = require("sequelize");
const axios = require('axios');
const cors = require('cors')

router.use(cors({origin: 'http://localhost:3000'}))

router.get('/countries', async (req, res, next) => {
 
  const { name } = req.query;
  try {
      if (name) {
          const countries = await Country.findAll({
            attributes: ["name", "flag", "continent", "id", "capital", "subregion", "area", "population"],
      
              where: {
                  name: {
                      [Op.iLike]: `%${name}%`
                  }
              }
          });
          return res.status(200).send(countries);
      }
      const countries = await Country.findAll({
        attributes: ["name", "flag", "continent", "population", "id"],
          include: Activity
      });
      res.status(200).send(countries);
  } catch (error) {
      next(error)
  }
});



router.get('/countries/:id', async (req, res, next) => {
    const id = req.params.id.toUpperCase();
    try {
        const countryId = await Country.findByPk(id, {
            include: Activity
        });
        res.status(200).send(countryId)
    } catch (error) {
        next(error)
    }
})

router.get('/activities', async (req, res, next) => {
    try {
        const activities = await Activity.findAll({
            include: Country
        });
        res.status(200).send(activities);
    } catch (error) {
        next(error)
    }
});

// router.post('/activities', async (req, res, next) => {
//     try {
//         const {
//             name,
//             difficulty,
//             duration,
//             season,
//             idCountry
//         } = req.body;

//         if (!name || !difficulty || !duration || !season || !idCountry) {
//             return res.status(400).send("information is missing");
//         }
//         let newActivity = await Activity.create({
//             name,
//             difficulty,
//             duration,
//             season,
//         });
//         countries.forEach(async (country) => {
//             let activityCountry = await Country.findOne({
//                 where: {
//                     name: country
//                 }
//             })
//             await newActivity.addCountry(activityCountry)
//         })
//         res.status(200).send("Activity is succefully created")
//     } catch (error) {
//         next(error)
//         res.status(400).send("Could not create activity")
//     }
// });

// router.post('/activity', async (req, res, next) => {
//     const { name, difficulty, duration, season, countries } = req.body;
    
//     if (!name || !difficulty || !duration || !season || !countries) {
//       return res.status(400).send("information is missing")
//     }
//     try {
//         const activity = await Activity.create({
//             name,
//             difficulty,
//             duration,
//             season,            
//         });
//         res.status(200).send("activity created")
//     } catch (error) {
//         next(error)
//         res.status(400).send("activity not created")

//     }
// })


router.post('/activities', async (req, res, next) => {
    try {
        const {
            name,
            difficulty,
            duration,
            season,
            countries
        } = req.body;                   //countries es un array de strings
                                        //

        if (!name || !difficulty || !duration || !season || !countries) {
            return res.status(400).send("Information is missing");
        }
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        });
        countries.forEach(async (country) => {
            let activityCountry = await Country.findOne({
                where: {
                    id: country
                }
            })
            await newActivity.addCountry(activityCountry)
        })
        res.status(200).send("Activity has been succesfully created")
     
    } catch (error) {
        next(error)
        res.status(400).send("Could not create activity")
    }
});



  






// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');






// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

