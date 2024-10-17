const express = require("express");
var cors = require('cors')
const route = require("./Routes/CompagnieRoute.js")
const router=require("./Routes/CarRoute.js")
const DB = require("./database/indexDb.js")
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors())
app.use("/api",route)
app.use("/api",router)
app.use(express.static(__dirname + '../react-client/indexFront.jsx'))



// app.get("/", (req, res) => {
//   res.send("Hello from the server!");
// });

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
