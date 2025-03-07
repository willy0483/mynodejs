// Importerer express og testModel
import express from "express";
import { categoryModel } from "../models/categoryModel.js";

// Opretter en router
export const categoryController = express.Router();

// READ: Route til at hente liste
categoryController.get("/categories", async (req, res) => {
  try {
    const data = await categoryModel.findAll({
      attributes: ["id", "name"],
    });

    if (!data || data.length === 0) {
      res.json({ message: "Error: No categories" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
categoryController.get("/categories/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await categoryModel.findOne({
      where: { id: id },
    });

    if (!result) {
      return res.status(404).json({ message: "Error: category not found" });
    }

    res.json(result);
  } catch (error) {
    res.json("Error: Failed to get category " + error);
  }
});

// CREATE: Route til at oprette
categoryController.post("/categories", async (req, res) => {
  try {
    const result = await categoryModel.create(req.body);
    res.status(201).json({ message: "Category was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create category";
    console.error("Error when creating category:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
categoryController.put("/categories/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await categoryModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `Category ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update category";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
categoryController.delete("/categories/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await categoryModel.destroy({
      where: { id },
    });

    res.json({
      message: `Category ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete category";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
