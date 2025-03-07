// Importerer express og testModel
import express from "express";
import { brandModel } from "../models/brandModel.js";

// Opretter en router
export const brandController = express.Router();

// READ: Route til at hente liste
brandController.get("/brands", async (req, res) => {
  try {
    const data = await brandModel.findAll({
      attributes: ["id", "name", "logo"],
    });

    if (!data || data.length === 0) {
      res.json({ message: "Error: No brands found" });
    }
    res.json(data);
  } catch (error) {
    res.send("Error: Failed to get all " + error);
  }
});

// READ: Route til at hente detaljer
brandController.get("/brands/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await brandModel.findOne({
      where: { id: id },
    });

    if (!result) {
      res.status(404).json({ message: "Error: No brand found" });
    }

    res.json(result);
  } catch (error) {}
});

// CREATE: Route til at oprette
brandController.post("/brands", async (req, res) => {
  try {
    const result = await brandModel.create(req.body);
    res.status(201).json({ message: "Brand was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create brand";
    console.error("Error when creating brand:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
brandController.put("/brands/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await brandModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `Brand ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update brand";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
brandController.delete("/brands/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await brandModel.destroy({
      where: { id },
    });

    res.json({
      message: `Brand ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete brand";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
