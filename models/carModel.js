import sequelize from "../Config/sequelizeConfig.js";
import { DataTypes, Model } from "sequelize";
import { brandModel } from "./brandModel.js";
import { categoryModel } from "./categoryModel.js";

export class carModel extends Model {}

carModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: brandModel,
        key: "id",
      },
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: categoryModel,
        key: "id",
      },
    },

    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    year: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    fueltype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "car",
    createdAt: true,
    updatedAt: true,
  },
);
