import express from "express";
import dotenv from "dotenv";
import sequelize from "./Config/sequelizeConfig.js";

import { carController } from "./controllers/carController.js";
import "./models/carModel.js";

dotenv.config();

const port = process.env.PORT;

// Initialiserer Express-applikationen
const app = express();

// Tilføjer controller som middleware
app.use(carController);

app.get("/", (req, res) => {
  res.send("Hej verden!");
});

app.get("/test", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Der er forbindelse til databasen");
    res.send("Der er forbindelse til databasen");
  } catch (error) {
    console.error("Fejl! Kunne ikke forbinde til databasen: ", error);
    res.status(500).send("Fejl! Kunne ikke forbinde til databasen.");
  }
});

app.get("/sync", async (req, res) => {
  try {
    const resp = await sequelize.sync();
    res.send("Data successfully synchronized");
  } catch (err) {
    res.send(err);
  }
});

app.listen(4242, () => {
  console.log("Express server kører....");
  console.log(`http://localhost:${port}`);
  console.log(`http://localhost:${port}/test`);
  console.log(`http://localhost:${port}/sync`);
});
