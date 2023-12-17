const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: [
      {
        name: { type: String, required: true, trim: true },
        quantity: { type: String, required: true, trim: true },
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requried: true,
    },
  },
  {
    timestamps: true,
  }
);

const RecipeModel = mongoose.model("Recipe", RecipeSchema);

module.exports = RecipeModel;
