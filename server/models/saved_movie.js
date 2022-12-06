const { DataTypes } = require("sequelize");

const { sequelize } = require("../util/database");

module.exports = {
  SavedMovie: sequelize.define("saved_movie", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  }),
};
