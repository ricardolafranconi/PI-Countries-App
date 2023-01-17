require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Activity, Country } = sequelize.models;


// Aca vendrian las relaciones
Activity.belongsToMany(Country, {  // relaciona las tablas activity y country
  through: 'activity_country',      // a traves de la tabla activity_country, que es la que tiene las claves foraneas
  foreignKey: 'activity_id',        // con la clave foranea activity_id, que sirve para relacionar la tabla activity con la tabla activity_country
  otherKey: 'country_id',           // y con la clave foranea country_id, que sirve para relacionar la tabla country con la tabla activity_country
});

Country.belongsToMany(Activity, { // relaciona las tablas country y activity
  through: 'activity_country',    // a traves de la tabla activity_country, que es la que tiene las claves foraneas, que ya fue creada en la relacion anterior
  foreignKey: 'country_id',       // con la clave foranea country_id, que sirve para relacionar la tabla country con la tabla activity_country
  otherKey: 'activity_id',        // y con la clave foranea activity_id, que sirve para relacionar la tabla activity con la tabla activity_country
});
  


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');

};
