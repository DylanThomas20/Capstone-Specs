require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { SERVER_PORT } = process.env;
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Movie } = require("./models/movie");
const { SavedMovie } = require("./models/saved_movie");

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Movie);
Movie.belongsTo(User);

User.hasMany(SavedMovie);
Movie.hasMany(SavedMovie);
SavedMovie.belongsTo(User);
SavedMovie.belongsTo(Movie);

const { register, login } = require("./controllers/authCtrl");
const { isAuthenticated } = require("./middleware/isAuthorized");
const {
  addMovie,
  editMovie,
  getAllMovies,
  addToMyMovies,
  getMyMovies,
  deleteSavedMovie,
  deleteMovie,
} = require("./controllers/moviesCtrl");

//User endpoints
app.post("/register", register);
app.post("/login", login);

//Movie endpoints
app.post("/movie/:userId", isAuthenticated, addMovie);
app.put("/movie", isAuthenticated, editMovie);
app.get("/movie", getAllMovies);
app.delete("/movie/:id", isAuthenticated, deleteMovie);

app.post("/myMovies", isAuthenticated, addToMyMovies);
app.get("/myMovies/:userId", isAuthenticated, getMyMovies);
app.delete("/myMovies/:id", isAuthenticated, deleteSavedMovie);

//Reset and Reseed DB .sync({ force: true })
sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(
      SERVER_PORT,
      console.log(`Server is running on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));
