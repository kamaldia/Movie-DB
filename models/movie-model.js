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

// Step 13 =========================================================

const user_schema = mongoose.Schema( {
  user_name: {
    type: String,
    required: [true, "Wrong username or password"]
  },
  password: {
    type: String,
    required: [true, "wrong username or password"]
  }
})

const User = mongoose.model("User", user_schema)
const Movie = mongoose.model("Movie", movie_schema);
module.exports = Movie;
module.exports = User;