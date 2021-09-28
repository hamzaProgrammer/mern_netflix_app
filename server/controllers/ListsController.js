const Lists = require('../models/ListShema')


// Adding New Movie
const createList = async (req, res) => {
    if (req.userId){
        const newList = new Lists(req.body)

        try {
            const addedList = await newList.save();

            res.status(201).json({addedList})
        } catch (error) {
            console.log("Error in createList and error is : ", error)
        }
    }else{
        res.status(404).json({message: "You Are Not Allowed to Add new List!!!!" })
    }

}


// Deleteing List
const deleteList = async (req, res) => {
    const { id } = req.params;

    if (req.userId){

        try {
            await Lists.findByIdAndDelete(id)

            res.status(201).json({message: "List has been DELETED"})
        } catch (error) {
            console.log("Error in deleteList and error is : ", error)
        }
    }else{
        res.status(404).json({message: "You Are Not Allowed to Delete Your Movie" })
    }

}

// Getting All  Movies
const getAllLists = async (req, res) => {
    try {
        const list = await Lists.find()

        res.status(201).json({allMoviesLists: list }) // this will show newwer posts
    } catch (error) {
        console.log("Error in getAllLists and error is : ", error)
    }
}


// Getting All  Movies
const getAllMoviesLists = async (req, res) => {
    try {
        const list = await Lists.find()

        res.status(201).json({allMoviesLists: list }) // this will show newwer posts
    } catch (error) {
        console.log("Error in getAllLists and error is : ", error)
    }
}


// for getting movies related
const getmoviesOnly = async (req, res) => {
    var list = []
    const { type }  = req.query
    const { name }  = req.params

    try {
        if(name === "movies"){
            if(type){
                list = await Lists.find({ type: "movies" , genre: type });
            }else{
                list = await Lists.find({ type: "movies" });
            }
        }else{
            if(type){
                list = await Lists.find({ type: "series" , genre: type });
            }else{
                list = await Lists.find({ type: "series" });
            }
        }

        res.status(201).json({allMoviesLists: list }) // this will show newwer posts
    } catch (error) {
        console.log("Error in getmoviesOnly and error is : ", error)
    }
}


// Updating Movie List
const updateMovieList = async (req, res) => {
    const { id } = req.params;

    if (req.userId){
        try {
            const updatedMovieList = await Lists.findByIdAndUpdate(id ,{ $set: req.body } , {new: true} )

            res.status(201).json({updatedMovieList})
        } catch (error) {
            console.log("Error in updateMovieList and error is : ", error)
        }
    }else{
        res.status(403).json({message: "You Are Not Allowed to Update Movie!!!" })
    }

}


module.exports = {
    createList,
    deleteList,
    getAllLists,
    updateMovieList,
    getmoviesOnly,
    getAllMoviesLists
}
