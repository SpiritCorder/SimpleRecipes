import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { toast } from "react-toastify";

const ConfirmationMessage = ({ prompt, title, handleClose, id, name }) => {
  const [processing, setProcessing] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const handleRecipeDelete = async () => {
    setProcessing(true);
    try {
      await axiosPrivate.delete(`/recipes/${id}`);
      // recipe deleted successfully, display toast message
      toast.success("Recipe Deleted");
      setProcessing(false);
      // close the model
      handleClose(true);
    } catch (err) {
      // display err message, close the model with failure state
      toast.error(err?.response?.data?.message || "Deletion Error");
      setProcessing(false);
      handleClose(false);
    }
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] rounded-md bg-white"
      style={{ zIndex: 2500 }}
    >
      <h4 className="border-b px-6 py-3 font-extrabold text-lg">{title}</h4>
      <p className="my-5 px-6">
        {prompt} <strong>{name}</strong> ?
      </p>
      <div className="flex items-center gap-2 px-6 pb-5">
        <button
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md"
          onClick={handleRecipeDelete}
        >
          {processing ? "Deleting..." : "Confirm"}
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white text-sm rounded-md"
          onClick={() => handleClose(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
