const express = require("express");
const cors = require('cors');
const CarRoutes = require ("./Routes/CarRoutes")
const CompanyRoutes = require ("./Routes/CompanyRoutes")
const projectdb = require("./database/indexDb.js")
const app = express();
const PORT = 8080;

app.use(cors())
app.use(express.json());
app.use("/cars", CarRoutes);
app.use("/company", CompanyRoutes);
app.use(express.static(__dirname + '../react-client/indexFront.jsx'))

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
