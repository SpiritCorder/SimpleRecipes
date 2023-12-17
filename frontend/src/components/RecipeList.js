import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axiosPrivate.get("/recipes");
        setRecipes(response.data.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchAllRecipes();
  }, [axiosPrivate]);

  const updateListAfterDelete = (id) => {
    setRecipes((prev) =>
      prev.filter((item) => item._id.toString() !== id.toString())
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-start gap-10">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          name={recipe.name}
          description={recipe.description}
          ingredients={recipe.ingredients}
          id={recipe._id}
          createdAt={recipe.createdAt}
          owner={recipe.owner}
          updateListAfterDelete={updateListAfterDelete}
        />
      ))}
    </div>
  );
};

export default RecipeList;
