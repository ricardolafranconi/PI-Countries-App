const { DataTypes, Op } = require('sequelize');
// Importamos la conexion a la base de datos
const sequelize = require('../db.js');


module.exports = (sequelize) => {

sequelize.define('country', {
    id:{
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

// module.exports = (sequelize, DataTypes) => {

//   const  Activity = sequelize.define('activity', {
//       id:{
//       type: DataTypes.INTEGER,
//       allowNull: false,     
//       primaryKey: true,
//       autoIncrement: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       difficulty:{
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: {
//           isIn: [[1, 2, 3, 4, 5]],
//         },
//       },
//       duration:{
//         type: DataTypes.INTEGER,
//         allowNull:false
//       },
//       season:{
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isIn: [['summer', 'winter', 'autumn', 'spring']],
//         },
//       },
//     });
//   }

// module.exports = (sequelize, DataTypes) => {
//   const Country_Activity = sequelize.define('country_activity', {
//     id:{
//       type: DataTypes.INTEGER,
//       allowNull: false,     
//       primaryKey: true,
//       autoIncrement: true,
//     },
//   });
// }

// module.exports = (sequelize, DataTypes) => {

  

