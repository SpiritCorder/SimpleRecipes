const express = require("express");
const router = express.Router();

// all of recipes related routes are protected routes
const auth = require("../middlewares/authMiddleware");
const {
  createRecipe,
  getSingleRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipesControllers");

// apply the auth middleware globaly to all routes related to recipes
router.use(auth);

router
  .route("/")
  .post(createRecipe) // create a new recipe
  .get(getRecipes); // get auth user's recipes

router
  .route("/:recipeId")
  .put(updateRecipe) // to update an existing recipe
  .get(getSingleRecipe) // to get info of a recipe
  .delete(deleteRecipe);

module.exports = router;
