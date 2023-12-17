import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RecipeCard from "./RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axiosPrivate.get("/recipes");
        setRecipes(response.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="flex flex-wrap items-center gap-10">
        {Array.from({ length: 5 }).map((val, index) => (
          <RecipeCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!loading && recipes.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <h1 className="text-lg">No recipes have added yet.</h1>
      </div>
    );
  }

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
