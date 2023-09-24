const express = require("express"); //requesting express framework

const app = express();
const the_port = 3001; //assigning server port to 3001
const time = ((new Date()).getHours()) + ":" +((new Date()).getMinutes()); // declaring variable time to store hours and minutes (HH:MM)

app.get('/test', (req, res) => { // test route returns ok
  res.status(200);
  res.send("status:200, message:\"ok\"");
});

app.get('/time', (req, res) => { // time rout returns current time
  res.status(200);
  res.send("status:200, message:\"" + time +"\"");
});

app.get('/hello/:id' , (req, res) => { // time rout returns current time
  const id = req.params.id;
  res.status(200);
  res.send(`status:200, message: ${id}`);
});

app.get("/search", (req, res) => {
  const user_search = req.query.s;
  if (user_search !== undefined) {
    res.status(200);
    res.send(`status:200, message:"ok", data: ${user_search}`);
  }
  else {
    res.status(500);
    res.send("status:500, error:true, message:\"you have to provide a search");
  }
});

app.listen(the_port, (error) => { // listener to know if server is running
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + the_port)
  else
    console.log("Error occurred, server can't start", error);
  }
);