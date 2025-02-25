// Importerer express og testModel
import express from "express";
import { carModel } from "../models/carModel.js";

// Opretter en router
export const carController = express.Router();

// READ: Route til at hente liste
carController.get("/cars", async (req, res) => {
  try {
    const result = await carModel.findAll();
    res.send(result);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
carController.get("/cars/:id([0-9]*)", async (req, res) => {
  // carModel.findOne();
  res.send("car 1");
});

// CREATE: Route til at oprette
carController.post("/cars", async (req, res) => {
  try {
    const result = await carModel.create(req.body);

    res.status(201).send("Car created");
  } catch (error) {
    res.status(400).send("Error: Failed create " + error);
  }
});

// UPDATE: Route til at opdatere
carController.put("/cars/:id([0-9]*)", async (req, res) => {
  // carModel.update();
});

// DELETE: Route til at slette
carController.delete("/cars/:id([0-9]*)", async (req, res) => {
  // carModel.destroy();
});
