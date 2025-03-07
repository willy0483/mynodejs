import express from "express";
import dotenv from "dotenv";
import sequelize from "./Config/sequelizeConfig.js";

import { carController } from "./controllers/carController.js";
import { brandController } from "./controllers/brandController.js";
import { categoryController } from "./controllers/categoryController.js";
import { userController } from "./controllers/userController.js";

// importerer modeller
import "./models/carModel.js";
import "./models/brandModel.js";
import "./models/categoryModel.js";
import "./models/userModel.js";

import { dbController } from "./controllers/dbController.js";
import { setRelations } from "./models/relations.js";

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));

setRelations();

// Tilføjer controller som middleware
app.use(
  dbController,
  carController,
  categoryController,
  brandController,
  userController,
);

app.get("/", (req, res) => {
  res.send("Hej verden!");
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
