const express = require("express"); //requesting express framework

const app = express();
const the_port = 3001; //assigning server port to 3001
const time = ((new Date()).getHours()) + ":" +((new Date()).getMinutes()); // declaring variable time to store hours and minutes (HH:MM)
const movies = [{title: "Jaws", year: 1975, rating: 8 }, {title: "Avatar", year: 2009, rating: 7.8}, {title: "Brazil", year: 1985, rating: 8}]; //movies array

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

app.get("/movies", (req, res) => {
  const movie_add = req.query.add;
  const movie_get = req.query.get;
  const movie_edit = req.query.edit;
  const movie_delete = req.query.delete;
  if (movie_add !== undefined) { //execute if there is add query in the url
    movies.push(movie_add); //adds input to movies array
    res.status(200);
    res.send(`status:200, message:"ok", data added: ${movie_add}`);
  }
  else if (movie_get !== undefined){
    // const movie_found = movies.find(movie => movie.title === movie_get); // movies.find will return undefined if there is no movie with a title matching the input
    // if (movie_found) { // if movie in query exists in the array, it will execute
    //   res.status(200);
    //   res.send(`status:200, message:"ok", data found: ${movie_get}`); // requested movie is shown with its properties
    // }
    // else { // if entered movie is not in array
    //   res.status(200);
    //   res.send(`status:200, message:"ok", data: ${movie_get} is not found`);
    // }
    const movie_list = movies.map((movie) => movie.title + " "); //mapping over list, taking the title from each object and adding a space to seperate them
    console.log(movie_list);
    res.status(200);
    res.send(`status:200, message:"ok", data: ${movie_list}`); //just read the instructions for step 5
  }
  else if (movie_edit !== undefined) { // if edit query exists
    const movie_to_edit = (movie_edit.trim()).split(" "); // made input an array, assuming that the string entered contains "value to edit" "value to replace it" seperated by whitespace, and trimmed to avoid conflict
    const movie_found = movies.find(movie => movie.title === movie_to_edit[0]);
    console.log(movie_to_edit);
    if (movie_found) { // if movie in query exists in the array, it will execute
      movies[movie_to_edit[0]].title = movie_to_edit[1];
      res.status(200);
      res.send(`status:200, message:"ok", data edited: ${movies[movie_to_edit[0]].title} to ${movie_to_edit[1]}`);
    }
    else { // if entered movie is not in array
      res.status(200);
      res.send(`status:200, message:"ok", data: ${movie_to_edit[0]} is not found`);
    }
  }
  else if (movie_delete !== undefined){
    if (movies.includes(movie_delete)) { // if movie in query exists in the array, it will execute
      res.status(200);
      res.send(`status:200, message:"ok", data deleted: ${movies.pop(movies[movie_delete])}`); // requested movie is shown with its properties
    }
    else { // if entered movie is not in array
      res.status(200);
      res.send(`status:200, message:"ok", data: ${movie_delete} is not found`);
    }
  }
  else {
    res.status(500);
    res.send("status:500, error:true, message:\"you have to provide a movie query");
  }
});

app.listen(the_port, (error) => { // listener to know if server is running
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + the_port)
  else
    console.log("Error occurred, server can't start", error);
  }
);