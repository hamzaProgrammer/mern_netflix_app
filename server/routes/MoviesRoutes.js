const express = require('express')
const router = express.Router();
const {
    createMovie,
    updateMovie,
    deleteMovie,
    getSingleMovieInfo,
    getRandomMovie,
    getAllMovie,
    getAllMoviesNames,
    getSingleMovieName
} = require('../controllers/MoviesController')
const middleware = require('../middleware/UserMiddleware')


//  ALLWAYS ADD MIDDLWARE IN EACH ROUTE


// Adding New Movie
router.post('/movies/addNew', middleware  , createMovie) // must add middlware

// Adding New Movie
router.put('/movies/:id', middleware  , updateMovie) // must add middlewre

// DELETE
router.delete('/movies/:id', middleware  , deleteMovie) // must add middleware

// for getting movies names and Ids only
router.get('/moviesSingle/:id'  , getSingleMovieName)

// Random Movies
router.get('/movies/random'  , getRandomMovie); // must add middleware

// GET All Movies
router.get('/movies'  , getAllMovie); // must add middleware

// for getting movies names and Ids only
router.get('/movies/getNames'  , getAllMoviesNames)



// GET Single Movie
router.get('/movies/:id'  , getSingleMovieInfo); // must add middleware




module.exports = router;