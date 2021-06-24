const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    //spoonacularSourceUrl!!!!!!!!!!!!!!!!!!!
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{ 
      type: DataTypes.TEXT,
      allowNull: false,
    },
    spoonacularScore: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    healthScore: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },
    instructions:  { 
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  });
};
