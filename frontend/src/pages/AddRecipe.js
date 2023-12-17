import { useState } from "react";

import RecipeForm from "../components/RecipeForm";
import IngredientList from "../components/IngredientList";

const AddRecipePage = () => {
  const [ingredients, setIngredients] = useState([]);

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
      <h1 className="text-4xl font-extrabold">Add New Recipe</h1>
      {/* Recipe Add Form */}
      <RecipeForm addIngredient={setIngredients} ingredients={ingredients} />
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
