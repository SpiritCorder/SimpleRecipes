import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAuthInfo } from "../redux/slices/authSlice";
import RecipeList from "../components/RecipeList";

const HomePage = () => {
  const { accessToken, user } = useSelector(selectAuthInfo);

  if (!accessToken || !user) {
    return (
      <div className="w-screen h-screen flex-row-center">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-4xl font-extrabold">
            To view & create new recipes, Log In
          </h1>
          <Link
            to="/login"
            className="px-5 py-2 bg-red-500 text-white text-lg font-semibold rounded-md"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-container mt-[60px] py-10">
      <h1 className="text-3xl font-extrabold">My Recipes</h1>
      <hr className="my-5"></hr>
      {/* Recipes List */}
      <RecipeList />
    </div>
  );
};

export default HomePage;
