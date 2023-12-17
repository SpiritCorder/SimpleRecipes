const RecipeModel = require("../models/Recipe");

// @desc - Create a new recipe
// @method - POST '/api/recipes'
// @access - Private

const createRecipe = async (req, res, next) => {
  const { name, description, ingredients } = req.body;

  // validate user inputs (server side validation)
  const errors = { name: "", description: "", ingredients: "" };

  if (name.trim() === "") {
    errors.name = "Recipe name is required";
  }
  if (description.trim() === "") {
    errors.description = "Recipe description is required";
  }
  if (ingredients.length <= 0) {
    errors.ingredients = "There should be at least one ingredient";
  }
  if (
    errors.name !== "" ||
    errors.description !== "" ||
    errors.ingredients !== ""
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid inputs", errors });
  }

  // create the new recipe
  const newRecipe = {
    name,
    description,
    ingredients,
    owner: req.user._id,
  };

  try {
    const recipe = await RecipeModel.create(newRecipe);
    res.status(201).json({ success: true, message: "Recipe created" });
  } catch (err) {
    next(err);
  }
};

// @desc - Update an existing recipe
// @method - PUT '/api/recipes/:recipeId'
// @access - Private

const updateRecipe = async (req, res, next) => {
  const { recipeId } = req.params;

  const { name, description, ingredients } = req.body;

  // validate user inputs (server side validation)
  const errors = { name: "", description: "", ingredients: "" };

  if (name.trim() === "") {
    errors.name = "Recipe name is required";
  }
  if (description.trim() === "") {
    errors.description = "Recipe description is required";
  }
  if (ingredients.length <= 0) {
    errors.ingredients = "There should be at least one ingredient";
  }
  if (
    errors.name !== "" ||
    errors.description !== "" ||
    errors.ingredients !== ""
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid inputs", errors });
  }

  try {
    const recipe = await RecipeModel.findById(recipeId).lean();

    // check whether a recipe exists with the given recipeId
    if (!recipe)
      return res
        .status(404)
        .json({
          success: false,
          message: `Recipe not found with the id ${recipeId}`,
        });

    // check whether owner is right
    if (recipe.owner.toString() !== req.user._id.toString())
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access to a resource" });

    await RecipeModel.findByIdAndUpdate(recipeId, {
      name,
      description,
      ingredients,
    });

    res.status(200).json({ success: true, message: "Recipe Updated" });
  } catch (err) {
    next(err);
  }
};

// @desc - Retrive all recipes of the auth user
// @method - GET '/api/recipes/'
// @access - Private

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await RecipeModel.find({ owner: req.user._id })
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({ success: true, message: "success", data: recipes });
  } catch (err) {
    next(err);
  }
};

// @desc - Retrive a single recipe
// @method - GET '/api/recipes/:recipeId'
// @access - Private

const getSingleRecipe = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    const recipe = await RecipeModel.findById(recipeId).lean();

    if (!recipe) {
      return res
        .status(404)
        .json({
          success: false,
          message: `Recipe not found with the id ${recipeId}`,
        });
    }

    // check whether the recipe was created by the auth user
    if (recipe.owner.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access to a resource" });
    }

    res.status(200).json({ success: true, message: "success", data: recipe });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecipe,
  updateRecipe,
  getRecipes,
  getSingleRecipe,
};
