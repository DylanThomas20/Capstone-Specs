const { DataTypes } = require("sequelize");

const { sequelize } = require("../util/database");

module.exports = {
  Movie: sequelize.define("movie", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    movieTitle: DataTypes.STRING,
    moviePoster: DataTypes.STRING,
  }),
};
