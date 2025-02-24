// Importerer express og testModel
import express from "express";
import { carModel } from "../models/carModel.js";

// Opretter en router
export const carController = express.Router();

// READ: Route til at hente liste
carController.get("/cars", async (req, res) => {
  // carModel.findAll()
});

// READ: Route til at hente detaljer
carController.get("/cars/:id([0-9]*)", async (req, res) => {
  // carModel.findOne()
});

// CREATE: Route til at oprette
carController.post("/cars", async (req, res) => {
  // carModel.create()
});

// UPDATE: Route til at opdatere
carController.put("/cars/:id([0-9]*)", async (req, res) => {
  // carModel.update()
});

// DELETE: Route til at slette
carController.delete("/cars/:id([0-9]*)", async (req, res) => {
  // carModel.destroy()
});
