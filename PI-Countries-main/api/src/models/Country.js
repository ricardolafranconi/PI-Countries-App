const { DataTypes, Op } = require('sequelize');
// Importamos la conexion a la base de datos
const sequelize = require('../db.js');


module.exports = (sequelize) => {  // Exportamos una funcion que define el modelo

sequelize.define('country', {       // Luego le injectamos la conexion a sequelize. que significa que va a ser un modelo de sequelize
    id:{                            // sequelize.define recibe el nombre del modelo como primer argumento y un objeto con las columnas del modelo
    type: DataTypes.STRING,
    allowNull: true,     
    primaryKey: true,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    area:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  });
};



  

