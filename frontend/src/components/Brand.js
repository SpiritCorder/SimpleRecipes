import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <Link
      to="/"
      className="w-max bg-red-900 text-white px-5 py-2 rounded-md font-brand flex-row-center"
    >
      <span>SimpleRecipes</span>
    </Link>
  );
};

export default Brand;
