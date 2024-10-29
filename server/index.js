const express = require("express");
var cors = require('cors')
const UserRoutes = require("./Routes/UserRoutes.js")
const CarRoutes = require ("./Routes/CarRoutes")
const CompanyRoutes = require ("./Routes/CompanyRoutes")
const signupCompanyRoutes=require ("./Routes/signupCompayRoutes.js")
const projectdb = require("./database/indexDb.js")
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors())
app.use("/cars", CarRoutes);
app.use("/company", CompanyRoutes);
app.use("/api",UserRoutes)
app.use("/api",signupCompanyRoutes)
app.use(express.static(__dirname + '../react-client/indexFront.jsx'))

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
