const express = require('express')
const router = express.Router();
const {
    createList,
    deleteList,
    getAllLists,
    updateMovieList,
    getmoviesOnly,
    getAllMoviesLists
} = require('../controllers/ListsController')
const middleware = require('../middleware/UserMiddleware')


// Adding New Movie
router.post('/moviesLists/addNewList' , middleware ,  createList); // must add iddleware

// DELETE
router.delete('/moviesList/:id', middleware ,  deleteList); // must add middleware in this

// GET All Movies Only
router.get('/moviesOnly/:name' ,  getmoviesOnly); // mus add middleware


// GET All Movies
router.get('/moviesLists' ,  getAllLists); // mus add middleware


// GET All Movies
router.get('/getMoviesLists' ,  getAllMoviesLists); // mus add middleware


// GET All Movies
router.put('/moviesList/:id', middleware ,  updateMovieList); // mus add middleware


module.exports = router;