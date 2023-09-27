const mongoose = require("mongoose");

const movie_schema = mongoose.Schema( {
  title: {
    type: String,
    required: [true, "Please enter movie title"]
  },
  year: {
    type: Number,
    required: [true, "Please enter movie release year"]
  },
  rating: {
    type: Number,
    required: false,
    default: 4,
  }
})

const Movie = mongoose.model("Movie", movie_schema);
module.exports = Movie;