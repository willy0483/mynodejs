// Importerer express
import express from "express";
import sequelize from "../Config/sequelizeConfig.js";

export const dbController = express.Router();

dbController.get("/test", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    res.send("Connection success");
  } catch (error) {
    res.send(error);
  }
});

dbController.get("/sycn", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    res.send("Data successfully synchronized");
  } catch (err) {
    res.send(err);
  }
});
