import { useState } from "react";

import { MdDeleteForever, MdEdit } from "react-icons/md";

const IngredientItem = ({
  name,
  qty,
  isEditable,
  removeIngredient,
  updateIngredient,
}) => {
  const [edit, setEdit] = useState(false);
  const [ingName, setIngName] = useState(name);
  const [ingQty, setIngQty] = useState(qty);

  const handleItemUpdate = () => {
    updateIngredient(name, ingName, ingQty);
    setEdit(false);
  };

  const handleItemDelete = () => removeIngredient(name);
  return (
    <div className="relative flex items-center py-3 border-b group">
      {edit ? (
        <>
          <div className="w-1/2 text-center border-r border-gray-400">
            <input
              type="text"
              className="w-1/2 bg-gray-200 border border-gray-300 rounded-sm px-5"
              value={ingName}
              onChange={(e) => setIngName(e.target.value)}
            />
          </div>
          <div className="w-1/2 text-center">
            <input
              type="text"
              className="w-1/2 bg-gray-200 border border-gray-300 rounded-sm px-5"
              value={ingQty}
              onChange={(e) => setIngQty(e.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          <span className="w-1/2 border-r border-gray-400 px-5">{name}</span>
          <span className="w-1/2 px-5">{qty}</span>
        </>
      )}

      {isEditable && (
        <div className="absolute top-0 right-0 translate-x-full items-center h-full gap-3 py-3 px-3 bg-gray-100 hidden group-hover:flex">
          {edit ? (
            <button
              className="px-4 p-2 bg-red-500 text-white text-xs rounded-full disabled:bg-red-200"
              onClick={handleItemUpdate}
              disabled={edit && (ingName.trim() === "" || ingQty.trim() === "")}
            >
              Update
            </button>
          ) : (
            <>
              <button
                className="flex items-center justify-center rounded-full w-8 h-8 hover:bg-gray-200"
                onClick={() => setEdit(true)}
              >
                <MdEdit fontSize={20} />
              </button>
              <button
                className="flex items-center justify-center rounded-full w-8 h-8 hover:bg-gray-200"
                onClick={handleItemDelete}
              >
                <MdDeleteForever className="text-red-500" fontSize={20} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default IngredientItem;
