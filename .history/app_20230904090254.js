//link express
const express = require("express");

//start express
const app = express();

//bad end point
app.get("/", function (req, res) {
  res.send("BAD END POINT");
});

//valid end point - start with /library
const routes = require(''./routes/libraryRoute');
app.use('/library', routes);

//create server port
let port = 5000;

//start server
app.listen(process.env.PORT || port, () => {
  console.log('Server running on port' + port);
});
