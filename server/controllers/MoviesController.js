const Movies = require('../models/MoviesSchema')

// Adding New Movie
const createMovie = async (req, res) => {
        const newMovie = new Movies(req.body)
        try {
            const addedMovie = await newMovie.save();

            res.status(201).json({addedMovie})
        } catch (error) {
            console.log("Error in createMovie and error is : ", error)
        }


}

// Updating Movie
const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body

    if (req.userId){
        try {
            const checkInfo = await Movies.findOne({title}).count()
            if(checkInfo > 1){
                res.status(201).json({message: "*** Movie Title Already Exists *** "})
            }else{
                const updatedMovie = await Movies.findByIdAndUpdate(id ,{ $set: req.body } , {new: true} )

                res.status(201).json({updatedMovie , message: ''})
            }
            }catch (error) {
                    console.log("Error in updateMovie and error is : ", error)
            }
        }else{
            res.status(403).json({message: "You Are Not Allowed to Update Movie!!!" })
        }

}

// Deleteing Movie
const deleteMovie = async (req, res) => {
    const { id } = req.params;

    if (req.userId){

        try {
            await Movies.findByIdAndDelete(id)

            res.status(201).json({message: "Movie has been DELETED"})
        } catch (error) {
            console.log("Error in deleteMovie and error is : ", error)
        }
    }else{
        res.status(404).json({message: "You Are Not Allowed to Delete Your Movie" })
    }

}

// Getting Single  Movie
const getSingleMovieInfo = async (req ,res) => {
    const { id } = req.params

        try {
            const gotMovie = await Movies.findById(id)

            res.status(201).json({gotMovie})
        } catch (error) {
            console.log("Error in getSingleMovieInfo and error is : ", error)
        }
}

// Getting All  Movies
const getAllMovie = async (req ,res) => {
        try {
            const allMovies = await Movies.find()

            res.status(201).json(allMovies.reverse())// this will show newwer posts
        } catch (error) {
            console.log("Error in getSingleMovieInfo and error is : ", error)
        }
}

// Getting Random Movie for Home page
const getRandomMovie = async (req, res) => {
    const type = req?.query?.type;

    let movie;
        try {
            if(type === "series"){
                movie = await Movies.aggregate([
                    { $match: { isSeries: true} },
                    { $sample: { size: 1}},
                ])
            }else{
                movie = await Movies.aggregate([
                    { $match: { isSeries: false} },
                    { $sample: { size: 1}},
                ])
            }

            res.status(201).json({movie})
        } catch (error) {
            console.log("Error in getRandomMovie and error is : ", error)
        }
}


// Getting All  Movies By names
const getAllMoviesNames = async (req, res) => {
    try {
        const allMovies = await Movies.find({} , { title: 1})

        res.status(201).json(allMovies.reverse()) // this will show newwer posts
    } catch (error) {
        console.log("Error in getAllMoviesNames and error is : ", error)
    }
}


// Getting Single Movie By names
const getSingleMovieName = async (req, res) => {
    const { id } = req.params;

    try {
        const singleMovie = await Movies.findById(id).select({title: 1 , _id: 0})

        res.status(201).json(singleMovie) // this will show newwer posts
    } catch (error) {
        console.log("Error in getSingleMovieName and error is : ", error)
    }
}



module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getSingleMovieInfo,
    getRandomMovie,
    getAllMovie,
    getAllMoviesNames,
    getSingleMovieName
}