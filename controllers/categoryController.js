// Importerer express og testModel
import express from "express";
import { categoryModel } from "../models/categoryModel.js";

// Opretter en router
export const categoryController = express.Router();

// READ: Route til at hente liste
categoryController.get("/category", async (req, res) => {
  try {
    const result = await categoryModel.findAll();
    res.send(result);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
categoryController.get("/category/:id([0-9]*)", async (req, res) => {
  // categoryModel.findOne();
  res.send("category 1");
});

// CREATE: Route til at oprette
categoryController.post("/category", async (req, res) => {
  try {
    const result = await categoryModel.create(req.body);
    res.status(201).send("Category created");
  } catch (error) {
    res.status(400).send("Error: Failed create " + error);
  }
});

// UPDATE: Route til at opdatere
categoryController.put("/category/:id([0-9]*)", async (req, res) => {
  // categoryModel.update();
});

// DELETE: Route til at slette
categoryController.delete("/category/:id([0-9]*)", async (req, res) => {
  // categoryModel.destroy();
});
