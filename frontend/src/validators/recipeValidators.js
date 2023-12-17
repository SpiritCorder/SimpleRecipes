export const validateRecipeName = (name) => {
  if (name.trim() === "") {
    return "Recipe name is required";
  }
  return "";
};

export const validateRecipeDescription = (desc) => {
  if (desc.trim() === "") {
    return "Description is required";
  }
  return "";
};

export const validateRecipeIngredients = (ingredients) => {
  if (ingredients.length <= 0) {
    return "There should be at least one ingredient";
  }
  return "";
};
