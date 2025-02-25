// Importerer express og testModel
import express from "express";
import { brandModel } from "../models/brandModel.js";

// Opretter en router
export const brandController = express.Router();

// READ: Route til at hente liste
brandController.get("/brand", async (req, res) => {
  try {
    const result = await brandModel.findAll();
    res.send(result);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
brandController.get("/brand/:id([0-9]*)", async (req, res) => {
  const result = await brandModel.findOne();
  console.log(result);

  res.send("brand 1");
});

// CREATE: Route til at oprette
brandController.post("/brand", async (req, res) => {
  try {
    const result = await brandModel.create(req.body);
    res.status(201).send("Brand created");
  } catch (error) {
    res.status(400).send("Error: Failed create " + error);
  }
});

// UPDATE: Route til at opdatere
brandController.put("/brand/:id([0-9]*)", async (req, res) => {
  // brandModel.update();
});

// DELETE: Route til at slette
brandController.delete("/brand/:id([0-9]*)", async (req, res) => {
  // brandModel.destroy();
});
