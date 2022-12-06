const { Movie } = require("../models/movie");
const { User } = require("../models/user");
const { SavedMovie } = require("../models/saved_movie");

module.exports = {
  addMovie: async (req, res) => {
    try {
      const { movieTitle, moviePoster } = req.body;
      const { userId } = req.params;

      await Movie.create({ movieTitle, moviePoster, userId });

      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  editMovie: async (req, res) => {
    try {
      const { movieTitle, moviePoster, movieId } = req.body;
      await Movie.update(
        {
          movieTitle,
          moviePoster,
          movieId,
        },
        {
          where: {
            id: +movieId,
          },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  getAllMovies: async (req, res) => {
    try {
      const movies = await Movie.findAll({
        include: [
          {
            model: User,
            required: true,
            attributes: ["username"],
          },
        ],
      });
      res.status(200).send(movies);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  addToMyMovies: async (req, res) => {
    try {
      const { userId, movieId } = req.body;
      await SavedMovie.create({ userId, movieId });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  getMyMovies: async (req, res) => {
    try {
      const { userId } = req.params;
      const saved_movie = await SavedMovie.findAll({
        where: { userId },
        include: [
          {
            model: Movie,
            require: true,
            include: [
              {
                model: User,
                required: true,
                attributes: ["username"],
              },
            ],
          },
        ],
      });
      res.status(200).send(saved_movie);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
