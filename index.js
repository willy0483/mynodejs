import express from "express";
import dotenv from "dotenv";
import sequelize from "./Config/sequelizeConfig.js";

import { carController } from "./controllers/carController.js";
import { brandController } from "./controllers/brandController.js";
import { categoryController } from "./controllers/categoryController.js";

// importerer modeller
import "./models/carModel.js";
import "./models/brandModel.js";
import "./models/categoryModel.js";

import { dbController } from "./controllers/dbController.js";

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));

// Tilføjer controller som middleware
app.use(dbController, carController, categoryController, brandController);

app.get("/", (req, res) => {
  res.send("Hej verden!");
});

app.get("/sync", async (req, res) => {
  try {
    const resp = await sequelize.sync();
    res.send("Data successfully synchronized");
  } catch (err) {
    res.send(err);
  }
});

app.get("*", (req, res) => {
  res.status(200).json({
    message: "404 - File not found",
  });
});

app.listen(port, () => {
  console.log("Express server kører....");
  console.log(`http://localhost:${port}`);
});
