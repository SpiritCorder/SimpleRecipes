import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateRecipeDescription,
  validateRecipeIngredients,
  validateRecipeName,
} from "../validators/recipeValidators";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { toast } from "react-toastify";

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
  const [processing, setProcessing] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    // prevent the default form submission behaviour
    e.preventDefault();

    setProcessing(true);

    // reset error state
    setError({ name: "", description: "", ingredients: "" });

    // validate input fields (client side validation)
    const nameRes = validateRecipeName(name);
    const descRes = validateRecipeDescription(description);
    const ingRes = validateRecipeIngredients(ingredients);

    if (nameRes !== "" || descRes !== "" || ingRes !== "") {
      // there is a validation error
      setError({ name: nameRes, description: descRes, ingredients: ingRes });
      setProcessing(false);
      return;
    }

    // no errors, submit the request
    try {
      await axiosPrivate.post(
        "/recipes",
        JSON.stringify({ name, description, ingredients })
      );

      // reset inputs
      setName("");
      setDescription("");
      addIngredient([]);

      // display toast message
      toast.success("Recipe Created");
      setProcessing(false);
      // redirect user to the home page
      navigate("/");
    } catch (err) {
      setProcessing(false);
      toast.error(err.response.data?.message);
    }
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
      <button
        className="bg-red-500 px-6 py-2 rounded-full text-white text-sm font-semibold flex-row-center gap-2"
        disabled={processing}
      >
        {processing ? (
          <>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-200 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            processing...
          </>
        ) : (
          "save"
        )}
      </button>
    </form>
  );
};

export default RecipeForm;
