// Importerer express og testModel
import express from "express";
import { carModel } from "../models/carModel.js";
import { brandModel } from "../models/brandModel.js";
import { categoryModel } from "../models/categoryModel.js";

// Opretter en router
export const carController = express.Router();

// READ: Route til at hente liste
carController.get("/cars", async (req, res) => {
  try {
    const data = await carModel.findAll({
      include: [
        {
          model: brandModel,
        },
        {
          model: categoryModel,
        },
      ],
    });
    if (!data || data.length === 0) {
      res.json({ message: "Error: No cars found" });
    }
    res.json(data);
  } catch (error) {
    consle.log(`Could not get car list: ${error}`);
  }
});

// READ: Route til at hente detaljer
carController.get("/cars/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    let result = await carModel.findOne({
      where: { id: id },
      include: [
        {
          model: brandModel,
        },
        {
          model: categoryModel,
        },
      ],
    });

    if (!result) {
      res.status(404).json({ message: "Error: No car found" });
    }

    res.json(result);
  } catch (error) {
    res.json({ message: `Error: ${error}` });
  }
});

// CREATE: Route til at oprette
carController.post("/cars", async (req, res) => {
  try {
    let { model, year, price, category, fueltype, brand_id, category_id } =
      req.body;

    const result = await carModel.create({
      model,
      year,
      price,
      category,
      fueltype,
      brand_id,
      category_id,
    });

    res.status(201).json({ message: "Car was created", content: result });
  } catch (error) {
    const errorMessage = "Could not create car";
    console.error("Error when creating car:", error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// UPDATE: Route til at opdatere
carController.put("/cars/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await carModel.update(req.body, {
      where: { id },
    });

    res.json({
      message: `Car ID#${id} was updated`,
    });
  } catch (error) {
    const errorMessage = "Could not update car";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});

// DELETE: Route til at slette
carController.delete("/cars/:id([0-9]*)", async (req, res) => {
  try {
    const { id } = req.params;

    await carModel.destroy({
      where: { id },
    });

    res.json({
      message: `Car ID#${id} was deleted`,
    });
  } catch (error) {
    const errorMessage = "Could not delete car";
    console.error(errorMessage, error);
    res.status(500).json({ message: errorMessage, content: error.message });
  }
});
