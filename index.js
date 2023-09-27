const express = require("express"); //requesting express framework
const mongoose = require('mongoose'); //requesting mongoose

const app = express();
const the_port = 3001; //assigning server port to 3001
const time = ((new Date()).getHours()) + ":" +((new Date()).getMinutes()); // declaring variable time to store hours and minutes (HH:MM)
// const movies = [{id: 1, title: "Jaws", year: 1975, rating: 8}, {id: 2, title: "Avatar", year: 2009, rating: 7.8}, {id: 3, title: "Brazil", year: 1985, rating: 8}]; //movies array
const Movie = require("./models/movie-model");

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

/* Step 6 ------------------------------------------------------------- */

// app.get("/movies/get/by-date", (req, res) => {
//   const movies_by_date = movies.sort((movie_1, movie_2) => (movie_1.year > movie_2.year) ? 1 : (movie_1.year < movie_2.year) ? -1 : 0); //sorting with the help of comparing function
//   // console.log(movies_by_date);
//   res.status(200);
//   res.send(`status:200, message:"ok", data: ${movies_by_date.map((movie) => " " + movie.title)}`)
// })

// app.get("/movies/get/by-rating", (req, res) => {
//   const movies_by_rating = movies.sort((movie_1, movie_2) => (movie_1.rating > movie_2.rating) ? -1 : (movie_1.rating < movie_2.rating) ? 1 : 0); //sorting with the help of comparing function, this time we put the values opposite to get descending order
//   // console.log(movies_by_rating);
//   res.status(200);
//   res.send(`status:200, message:"ok", data: ${movies_by_rating.map((movie) => " " + movie.title)}`)
// })

// app.get("/movies/get/by-title", (req, res) => {
//   const movies_by_title = movies.sort((movie_1, movie_2) => (movie_1.title[0] > movie_2.title[0]) ? 1 : (movie_1.title[0] < movie_2.title[0]) ? -1 : 0); //sorting with the help of comparing function
//   // console.log(movies_by_title);
//   res.status(200);
//   res.send(`status:200, message:"ok", data: ${movies_by_title.map((movie) => " " + movie.title)}`)
// })

/* Step 7 --------------------------------------------------------------- */

// app.get("/movies/get/id/:id", (req, res) => {
//   const id = req.params.id;
//   const movie_by_id = movies.find((movie) => movie.id == id) // used find() since id is unique
//   if (movie_by_id) {
//     res.status(200);
//     res.send(`status:200, message:"ok", data: ${movie_by_id.title}`)
//   }
//   else {
//     res.status(404);
//     res.send(`status:404, error:true, message: the movie id= "${id}" does not exist.`)
//   }
// })

/* Step 8 --------------------------------------------------------------- */

// app.post("/movies/post", (req, res) => {
//   const movie_add_title = req.query.title;
//   const movie_add_year = req.query.year;
//   const movie_add_rating = req.query.rating;
//   if (movie_add_title !== undefined && (movie_add_year !== undefined && movie_add_year.length === 4) && !isNaN(movie_add_year)) { // added (undefined and length) to avoid error when no year query is given
//     let movie = {};
//     movie.title = movie_add_title;
//     movie.year = parseFloat(movie_add_year);
//     if (movie_add_rating !== undefined){
//       movie.rating = parseFloat(movie_add_rating);
//     }
//     else {
//       movie.rating = 4;
//     }
//     movies.push(movie);
//     // console.log(movies);
//     const movie_list = movies.map((movie) => " " + movie.title); //mapping over list, taking the title from each object and adding a space to seperate them
//     res.status(200);
//     res.send(`status:200, message:"ok", data: ${movie_list}`);
//   }
//   else{
//     res.status(403);
//     res.send(`status:403, error:true, message: you cannot create a movie without providing a title and a year.`)
//   }
// })

/* Step 9 --------------------------------------------------------------- */

// app.delete("/movies/delete/:id", (req, res) => {
//   const id = req.params.id;
//   const movie_by_id = movies.find((movie) => movie.id == id) // used find() since id is unique
//   if (movie_by_id) {
//     i = movies.findIndex((movie) => movie.id == id);
//     movies.splice(i,1);
//     // console.log(movies);
//     const movie_list = movies.map((movie) => " " + movie.title); //mapping over list, taking the title from each object and adding a space to seperate them
//     res.status(200);
//     res.send(`status:200, message:"ok", data: ${movie_list}`);
//   }
//   else {
//     res.status(404);
//     res.send(`status:404, error:true, message: the movie id= "${id}" does not exist.`)
//   }
// })

/* Step 10 --------------------------------------------------------------- */


// app.put("/movies/put/:id", (req, res) => {
//   const id = req.params.id;
//   const new_title = req.query.title;
//   const new_year = req.query.year;
//   const new_rating = req.query.rating;
//   const movie_found = movies.find(movie => movie.id == id); //used == since id is taken as string
//   // console.log(movie_found);
//   if (movie_found) { // if movie in query exists in the array, it will execute
//     const i = movies.findIndex(movie => movie.id == id);
//     if (new_title) {  // chexck if new_title is not undefined
//       movies[i].title = new_title;
//     }
//     if (new_year && new_year.length === 4 && !isNaN(new_year)) {
//       movies[i].year = parseFloat(new_year);
//     }
//     if (new_rating && !isNaN(new_rating)) {
//       movies[i].rating = parseFloat(new_rating);
//     }
//     const movie_list = movies.map((movie) => " " + movie.title);
//     res.status(200);
//     res.send(`status:200, message:"ok", data: ${movie_list}`);
//   }
//   else { // if entered movie id is not in array
//     res.status(404);
//     res.send(`status:404, error:true, message: the movie id= "${id}" does not exist.`);
//   }
//   // console.log(movie_found);
// })

/* Step 11 ---------------------------------------------------------------- */

//Changed URLs and methods, to get, post, put, delete

/* ------------------------------------------------------------------------ */

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
})

// app.post("/movies/from-body", async(req, res) => { // to post a movie directly through the body in API, commented since not required
//   try {
//     const movie_post = await Movie.create(req.body);
//     res.status(200);
//     res.json(movie_post);
//   } catch (error) {
//       console.log(error.message);
//       res.status(500);
//       res.json({message: error.message})
//     }
// })

app.delete("/movies/delete/:id", async(req, res) => {
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
})

app.put("/movies/put/:id", async(req, res) => {
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