import { useState } from "react";
import {
  validateRecipeDescription,
  validateRecipeIngredients,
  validateRecipeName,
} from "../validators/recipeValidators";

const RecipeForm = ({ addIngredient, ingredients }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingName, setIngName] = useState("");
  const [ingQty, setIngQty] = useState("");
  const [error, setError] = useState({
    name: "",
    description: "",
    ingredients: "",
  });

  const handleAddIngredient = () => {
    // reset error state's ingredients related error
    setError({ ...error, ingredients: "" });

    // check whether the ingredient exists or not
    const found = ingredients.find(
      (ing) => ing.name.toLowerCase() === ingName.toLowerCase()
    );
    if (found) {
      // display error message
      setError({ ...error, ingredients: `${ingName} already added` });
      return;
    }

    // if the ingredient not added, add it
    addIngredient([...ingredients, { name: ingName, quantity: ingQty }]);

    // reset form fields
    setIngName("");
    setIngQty("");
  };

  const handleSubmit = (e) => {
    // prevent the default form submission behaviour
    e.preventDefault();

    // reset error state
    setError({ name: "", description: "", ingredients: "" });

    // validate input fields (client side validation)
    const nameRes = validateRecipeName(name);
    const descRes = validateRecipeDescription(description);
    const ingRes = validateRecipeIngredients(ingredients);

    if (nameRes !== "" || descRes !== "" || ingRes !== "") {
      // there is a validation error
      setError({ name: nameRes, description: descRes, ingredients: ingRes });
      return;
    }

    // no errors, submit the request
    alert("ready to create the new recipe");
  };

  return (
    <form className="w-2/3" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 mb-5">
        <label
          htmlFor="name"
          className="text-sm text-gray-500 flex items-center gap-3"
        >
          Recipe Name
          {error.name && (
            <small className="text-red-500">( {error.name} )</small>
          )}
        </label>
        <input
          type="text"
          id="name"
          placeholder="rice & curry"
          className="py-2 px-4 border border-gray-300 rounded-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label
          htmlFor="desc"
          className="text-sm text-gray-500 flex items-center gap-3"
        >
          Description
          {error.description && (
            <small className="text-red-500">( {error.description} )</small>
          )}
        </label>
        <textarea
          id="desc"
          placeholder="how to create the recipe ?"
          className="py-2 px-4 border border-gray-300 rounded-sm"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label className="text-sm text-gray-500 flex items-center gap-3">
          Ingredients{" "}
          {error.ingredients && (
            <small className="text-red-500">( {error.ingredients} )</small>
          )}
        </label>
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="ingredient-name" className="text-xs text-gray-500">
              Name
            </label>
            <input
              type="text"
              placeholder="onion"
              id="ingredient-name"
              className="border py-2 px-3 border-gray-300 rounded-sm"
              value={ingName}
              onChange={(e) => setIngName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="ingredient-qty" className="text-xs text-gray-500">
              Quantity
            </label>
            <input
              type="text"
              placeholder="3 cloves"
              id="ingredient-qty"
              className="border py-2 px-3 border-gray-300 rounded-sm"
              value={ingQty}
              onChange={(e) => setIngQty(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="bg-red-900 px-4 py-2 text-white self-end rounded-sm text-sm disabled:bg-red-200"
            disabled={ingName.trim() === "" || ingQty.trim() === ""}
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
      </div>
      <button className="bg-red-500 px-6 py-2 rounded-full text-white text-sm font-semibold">
        Save
      </button>
    </form>
  );
};

export default RecipeForm;
