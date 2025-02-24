// Importerer express
import express from "express";

// Importerer de modeller der skal oprettes
import { carModel } from "../models/carModel";

// Opretter en router
export const dbController = express.Router();

// Endpoint til at synkronisere databasen
dbController.get("/sync", async (req, res) => {
  try {
    const resp = await sequelize.sync({ force: true });
    res.send("Data successfully synchronized");
  } catch (err) {
    res.send(err);
  }
});
