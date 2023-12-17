import { createPortal } from "react-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { selectAuthUser } from "../redux/slices/authSlice";
import { MdChevronRight, MdDeleteForever, MdEdit } from "react-icons/md";

import Overlay from "./Overlay";
import ConfirmationMessage from "./ConfirmationMessage";

const RecipeCard = ({
  name,
  description,
  ingredients,
  id,
  createdAt,
  owner,
  updateListAfterDelete,
}) => {
  const [modelOpen, setModelOpen] = useState(false);

  const authUser = useSelector(selectAuthUser);
  const navigate = useNavigate();

  const closeModel = (isConfirmed) => {
    setModelOpen(false);

    if (isConfirmed) {
      // update the state of RecipeList
      updateListAfterDelete(id);
    }
  };

  return (
    <div className="relative min-w-[370px] w-[370px] min-h-[230px] h-[230px] rounded overflow-hidden shadow-lg">
      {modelOpen &&
        createPortal(<Overlay />, document.getElementById("overlay-container"))}
      {modelOpen &&
        createPortal(
          <ConfirmationMessage
            prompt={`Are you sure that you want to delete recipe `}
            title="Delete Confirmation"
            id={id}
            name={name}
            handleClose={closeModel}
          />,
          document.getElementById("content-container")
        )}

      {/* Edit & Delete Buttons */}
      {owner.toString() === authUser._id.toString() && (
        <div className="absolute top-0 right-0 flex-row-center gap-2 p-2">
          <button
            className="flex-row-center w-8 h-8 rounded-full hover:bg-gray-200"
            onClick={() => navigate(`/add-recipe?edit=true&recipeId=${id}`)}
          >
            <MdEdit fontSize={22} />
          </button>
          <button
            className="flex-row-center w-8 h-8 rounded-full hover:bg-gray-200"
            onClick={() => setModelOpen(true)}
          >
            <MdDeleteForever fontSize={22} className="text-red-500" />
          </button>
        </div>
      )}

      <div className="px-8 py-6">
        <h1 className="font-bold text-xl mb-2">
          {name.length > 22 ? `${name.slice(0, 20)}...` : name}
        </h1>
        <p className="text-gray-700 text-base custom-line-clamp">
          {description}
        </p>
        <p className="text-gray-400 text-sm mb-0 mt-3">
          Created at {new Date(createdAt).toDateString()}
        </p>
      </div>
      <div className="px-8 pb-6">
        <Link
          to={`/recipes/${id}`}
          className="px-5 py-2 bg-red-500 text-white rounded-sm flex-row-center gap-1 w-max"
        >
          View more <MdChevronRight className="translate-y-0.5" fontSize={22} />
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
