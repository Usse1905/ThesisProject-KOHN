const express = require("express");
var cors = require('cors')
const route = require("./Routes/Routes.js")
const gdb = require("./db-mysql/indexDb.js")
const app = express();
const PORT = 8080;

app.use(cors())
app.use(express.json());
app.use("/api",route)
app.use(express.static(__dirname + '../react-client/indexFront.jsx'))



// app.get("/", (req, res) => {
//   res.send("Hello from the server!");
// });

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
