import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import IngredientList from "../components/IngredientList";

const AddRecipePage = () => {
  const [ingredients, setIngredients] = useState([]);

  const [searchParams] = useSearchParams();

  const isEdit =
    searchParams.get("edit") && searchParams.get("edit") === "true"
      ? true
      : false;
  const recipeId = searchParams.get("recipeId")
    ? searchParams.get("recipeId")
    : null;

  const removeIngredient = (name) =>
    setIngredients((prev) =>
      prev.filter((ing) => ing.name.toLowerCase() !== name.toLowerCase())
    );

  const updateIngredient = (oldName, newName, newQty) => {
    const updatedIngredients = ingredients.map((ing) => {
      if (ing.name.toLowerCase() === oldName.toLowerCase()) {
        // update this particular ingrdient
        return { name: newName, quantity: newQty };
      }
      return ing;
    });
    setIngredients(updatedIngredients);
  };

  return (
    <div className="custom-container mt-[60px] py-10 flex flex-col items-center gap-10">
      <h1 className="text-4xl font-extrabold">
        {isEdit ? "Edit Recipe" : "Add New Recipe"}
      </h1>
      {/* Recipe Add Form */}
      <RecipeForm
        addIngredient={setIngredients}
        ingredients={ingredients}
        isEdit={isEdit}
        recipeId={recipeId}
      />
      {/* Recipe Ingredients List */}
      {ingredients.length > 0 && (
        <>
          <hr className="bg-gray-100 w-full h-[1px]"></hr>
          <IngredientList
            ingredients={ingredients}
            isEditable
            removeIngredient={removeIngredient}
            updateIngredient={updateIngredient}
          />
        </>
      )}
    </div>
  );
};

export default AddRecipePage;
