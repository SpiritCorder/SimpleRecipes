import IngredientItem from "./IngredientItem";

const IngredientList = ({
  ingredients,
  isEditable = false,
  removeIngredient = null,
  updateIngredient = null,
}) => {
  return (
    <div className="w-2/3">
      <h1 className="text-2xl font-semibold mb-5">Ingredients</h1>
      <div className="bg-gray-100">
        <div className="flex items-center py-3 border-b">
          <span className="w-1/2 border-r border-gray-400 px-5 text-center">
            Name
          </span>
          <span className="w-1/2 px-5 text-center">Quantity</span>
        </div>
        {ingredients.map((ing) => (
          <IngredientItem
            key={ing.name}
            name={ing.name}
            qty={ing.quantity}
            isEditable={isEditable}
            removeIngredient={removeIngredient}
            updateIngredient={updateIngredient}
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
