const express = require("express");
const CarRoutes = require ("./Routes/CarRoutes")
const CamponyRoutes = require ("./Routes/CampanyRoutes")

const cors = require('cors')
const app = express();
const PORT = 8080;

app.use(cors())
app.use(express.json());
app.use("/api",route)

app.use("/cars", CarRoutes);
app.use("/campony", CamponyRoutes);


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
