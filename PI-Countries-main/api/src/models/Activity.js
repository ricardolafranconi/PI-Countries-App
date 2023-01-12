const {DataTypes} = require ('sequelize')

module.exports = (sequelize) => {

   const Activity = sequelize.define('activity',{
      
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty:{
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: false,
            
        },
    
        duration:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        season:{
            type: DataTypes.ENUM('Summer', 'Winter', 'Autumn', 'Spring'),
            allowNull: false,
            
        },

    })

    }
    
 

   