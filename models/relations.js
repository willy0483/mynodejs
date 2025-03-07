import { carModel } from "../models/carModel.js";
import { brandModel } from "../models/brandModel.js";
import { categoryModel } from "../models/categoryModel.js";

export const setRelations = () => {
  carModel.belongsTo(brandModel, {
    foreignKey: "brand_id",
  });
  brandModel.hasMany(carModel, {
    foreignKey: "brand_id",
    onDelete: "CASCADE",
    hooks: true,
  });

  carModel.belongsTo(categoryModel, {
    foreignKey: "category_id",
  });
  categoryModel.hasMany(carModel, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
    hooks: true,
  });
};
