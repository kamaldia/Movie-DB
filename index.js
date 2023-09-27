const express = require("express"); //requesting express framework
const mongoose = require('mongoose'); //requesting mongoose

const app = express();
const the_port = 3001; //assigning server port to 3001
const time = ((new Date()).getHours()) + ":" +((new Date()).getMinutes()); // declaring variable time to store hours and minutes (HH:MM)
// const movies = [{id: 1, title: "Jaws", year: 1975, rating: 8}, {id: 2, title: "Avatar", year: 2009, rating: 7.8}, {id: 3, title: "Brazil", year: 1985, rating: 8}]; //movies array
const Movie = require("./models/movie-model");
const User = require("./models/movie-model");
let authentication_flag = false; //---------------------------------------------------- Step 13

app.use(express.json()); //to read json files

app.get('/test', (req, res) => { // test route returns ok
  res.status(200);
  res.send("status:200, message:\"ok\"");
});

app.get('/time', (req, res) => { // time route returns current time
  res.status(200);
  res.send("status:200, message:\"" + time +"\"");
});

app.get('/hello/:id' , (req, res) => { // id route returns given id
  const id = req.params.id;
  res.status(200);
  res.send(`status:200, message: ${id}`);
});

app.get("/search", (req, res) => {
  const user_search = req.query.s;
  if (user_search !== undefined) { // if there is an "s" query in the url, this if will execute
    res.status(200);
    res.send(`status:200, message:"ok", data: ${user_search}`);
  }
  else {
    res.status(500);
    res.send("status:500, error:true, message:\"you have to provide a search");
  }
});

/* Step 12 ---------------------------------------------------------------- */

app.get("/movies/get/by-date", async(req, res) => { //put async keyword to make it asyncronous function
  try { // to try if all is working
    const movies = await Movie.find({}); //waits for data to be found and fetched using await keyword, assigned to variable
    const movies_by_date = movies.sort((movie_1, movie_2) => (movie_1.year > movie_2.year) ? 1 : (movie_1.year < movie_2.year) ? -1 : 0); //sorting with the help of comparing function
    res.status(200);
    res.json(movies_by_date); //returned as json file
  } catch (error) { // to catch error if the try block didn't work
      console.log(error.message);
      res.status(500);
      res.json({message: error.message})
    }
})

app.get("/movies/get/by-rating", async(req, res) => {
  try {
    const movies = await Movie.find({}); //getting data from db through API
    const movies_by_rating = movies.sort((movie_1, movie_2) => (movie_1.rating > movie_2.rating) ? -1 : (movie_1.rating < movie_2.rating) ? 1 : 0); //sorting with the help of comparing function, this time we put the values opposite to get descending order
    // console.log(movies_by_rating);
    res.status(200);
    res.json(movies_by_rating);
  } catch (error) {
      console.log(error.message);
      res.status(500);
      res.json({message: error.message})
    }
})

app.get("/movies/get/by-title", async(req, res) => {
  try {
    const movies = await Movie.find({});
    const movies_by_title = movies.sort((movie_1, movie_2) => (movie_1.title[0] > movie_2.title[0]) ? 1 : (movie_1.title[0] < movie_2.title[0]) ? -1 : 0); //sorting with the help of comparing function
    // console.log(movies_by_title);
    res.status(200);
    res.json(movies_by_title);
  } catch {
      console.log(error.message);
      res.status(500);
      res.json({message: error.message})
    }
})

app.get("/movies/get/id/:id", async(req, res) => {
  try {
    const id = req.params.id;
    const movie_by_id = await Movie.findById(id); //fetching data by id
    res.status(200);
    res.json(movie_by_id);
  } catch (error) {
      console.log(error.message);
      res.status(500);
      res.json({message: error.message})
    }
})

app.post("/movies/post", async(req, res) => {
  if (authentication_flag) { //--------------------------------------------- Step 13
    try {
      const movie_add_title = req.query.title;
      const movie_add_year = req.query.year;
      const movie_add_rating = req.query.rating;
      if (movie_add_title !== undefined && (movie_add_year !== undefined && movie_add_year.length === 4) && !isNaN(movie_add_year)) { // added (undefined and length) to avoid error when no year query is given
        let movie = {};
        movie.title = movie_add_title;
        movie.year = parseFloat(movie_add_year);
        if (movie_add_rating !== undefined){
          movie.rating = parseFloat(movie_add_rating);
        }
        else {
          movie.rating = 4;
        }
        await Movie.create(movie); //posting the movie object to db
        // console.log(movies);
        const movies = await Movie.find({}); //fetching movies after adding the new one
        res.status(200);
        res.json(movies);
      }
      else{
        res.status(403);
        res.send(`status:403, error:true, message: you cannot create a movie without providing a title and a year(with right format \"YYYY\").`)
      }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.json({message: error.message})
      }
  } else{
    console.log("authentication failed")
  }
})

app.delete("/movies/delete/:id", async(req, res) => {
  if (authentication_flag) { //--------------------------------------------- Step 13
    try {
      const id = req.params.id;
      const movie_by_id = await Movie.findByIdAndDelete(id); //deleting the movie by id
      if (movie_by_id) {
        const movies = await Movie.find({}); //if deletion is successful, fetch the updated movie list
        res.status(200);
        res.json(movies);
      }
      else {
        res.status(404);
        res.send(`status:404, error:true, message: the movie id= "${id}" does not exist.`)
      }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.json({message: error.message})
      }
    } else{
      console.log("authentication failed")
    }
})

app.put("/movies/put/:id", async(req, res) => {
  if (authentication_flag) { //--------------------------------------------- Step 13
    try {
      const id = req.params.id;
      const new_title = req.query.title;
      const new_year = req.query.year;
      const new_rating = req.query.rating;
      const movies = await Movie.find({}); //saving movies list as an array
      const movie_found = movies.find(movie => movie.id == id); //used == since id is taken as string
      // console.log(movie_found);
      if (movie_found) { // if movie in query exists in the array, it will execute
        if (new_title) {  // check if new_title is not undefined
          await Movie.findByIdAndUpdate(id, {"title": new_title}); //updating title using find by id and update
        }
        if (new_year && new_year.length === 4 && !isNaN(new_year)) {
          await Movie.findByIdAndUpdate(id, {"year": parseFloat(new_year)});
        }
        if (new_rating && !isNaN(new_rating)) {
          await Movie.findByIdAndUpdate(id, {"rating": parseFloat(new_rating)});
        }
        const movies_updated = await Movie.find({});
        res.status(200);
        res.json(movies_updated);
      }
      else { // if entered movie id is not in array
        res.status(404);
        res.send(`status:404, error:true, message: the movie id= "${id}" does not exist.`);
      }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.json({message: error.message})
      }
    } else{
        console.log("authentication failed")
      }
})

/* ------------------------------------------------------------------------ */

/* Step 13 ---------------------------------------------------------------- */

app.post("/user/from-body", async(req, res) => { //add a new username and password through API
  try {
    const user_new = await User.create(req.body);
    res.status(200);
    res.json(user_new);
  } catch (error) {
      console.log(error.message);
      res.status(500);
      res.json({message: error.message})
    }
})

app.get("/user/get/:id", async(req, res) => { // Try this as a get request: http://localhost:3001/user/get/651496def034ddd2cf4862cb?user=Kamal&pass=Dia
  try {
    const id = req.params.id;
    const user_name = req.query.user;
    const password = req.query.pass;
    const user_by_id = await User.findById(id); //fetching data by id to save time
    if(user_by_id.user_name == user_name && user_by_id.password == password) {
      authentication_flag = true;
    } else {
      authentication_flag = false;
    }
    res.status(200);
    res.send("ok");
  } catch (error) {
      console.log(error.message);
      res.status(500);
      res.json({message: error.message})
    }
})

mongoose.connect("mongodb+srv://kamaldia:gy1YZgsFTKoLipKI@moviedb.aoizwu0.mongodb.net/MovieDB-API?retryWrites=true&w=majority") //connecting to mongodb using my API key
.then(() => {
  console.log("connected to Mongo Data Base."); //when connected show in console
  app.listen(the_port, (error) => { // listener to know if server is running, we put listener inside the mongoose to connect to database before local host starts running
    if (!error)
      console.log("Server is Successfully Running, and App is listening on port " + the_port)
    else
      console.log("Error occurred, server can't start", error);
    }
  );
}).catch((error) => {
    console.log(error); //if there is an error it will be sent in the response, catched and shown in console through this method
})

/* ------------------------------------------------------------------------ */