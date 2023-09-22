const express = require("express"); //requesting express framework

const app = express();
const the_port = 3001; //assigning server port to 3001
const time = ((new Date()).getHours()) + ":" +((new Date()).getMinutes()); // declaring variable time to store hours and minutes (HH:MM)

app.get('/test', (req, res) => { // test route returns ok
  res.status(200);
  res.send("ok");
});

app.get('/time', (req, res) => { // time rout returns current time
  res.status(200);
  res.send(time);
});

app.listen(the_port, (error) => { // listener to know if server is running
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + the_port)
  else
    console.log("Error occurred, server can't start", error);
  }
);