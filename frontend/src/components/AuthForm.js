import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Brand from "./Brand";

import {
  validateUsername,
  validatePassword,
} from "../validators/authValidators";

import { loginSuccess } from "../redux/slices/authSlice";

import { axiosPublic } from "../config/axios";

const AuthForm = ({ title, type }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const [processing, setProcessing] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingAccountMsg =
    type === "login" ? "Don't have an account? " : "Already have an account? ";
  const existingAccountRedirectUrl = type === "login" ? "/register" : "/login";

  // form submit handler
  const handleFormSubmit = async (e) => {
    // prevent the default form submission bahaviour
    e.preventDefault();
    setProcessing(true);

    // reset the error state
    setError({ username: "", password: "" });

    // validate inputs (client side validation)
    const usernameRes = validateUsername(username);
    const passwordRes = validatePassword(password);

    if (usernameRes !== "" || passwordRes !== "") {
      setError({ username: usernameRes, password: passwordRes });
      setProcessing(false);
      return;
    }

    // if no errors, send the request to the backend API with credentials
    const url = type === "login" ? "/auth/login" : "/auth/register";
    try {
      const response = await axiosPublic.post(
        url,
        JSON.stringify({ username, password })
      );
      // update redux global auth state
      dispatch(loginSuccess(response.data.data));
      setProcessing(false);

      // redirect user to home page
      navigate("/");
    } catch (err) {
      const errMsg = err.response.data.message;
      setError({ username: errMsg, password: errMsg });
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-[350px] px-8 py-8 bg-white shadow-lg rounded-md">
      {/* Brand */}
      <div className="flex-row-center">
        <Brand />
      </div>
      {/* Title */}
      <h1 className="text-2xl font-semibold">{title}</h1>
      {/* Form  */}
      <form onSubmit={handleFormSubmit}>
        {/* Username Input */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 relative pb-2">
            <label
              className="block  tracking-wide text-gray-500 text-xs font-semibold mb-2"
              htmlFor="username"
            >
              Username{" "}
              <small className=" text-gray-400">
                ( must be at least 4 characters long )
              </small>
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="username"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {error.username !== "" && (
              <p
                className={`absolute bottom-0 left-0 px-3 text-red-500 text-xs italic`}
              >
                {error.username}
              </p>
            )}
          </div>
        </div>
        {/* Password Input */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 relative pb-2">
            <label
              className="block  tracking-wide text-gray-500 text-xs font-semibold mb-2"
              htmlFor="password"
            >
              Password{" "}
              <small className=" text-gray-400">
                ( At least 4 characters, no leading or trailing spaces )
              </small>
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password !== "" && (
              <p
                className={`absolute bottom-0 left-0 px-3 text-red-500 text-xs italic`}
              >
                {error.password}
              </p>
            )}
          </div>
        </div>
        {/* Submit Button */}
        <button
          className="bg-red-500 px-4 py-2 text-white rounded-md flex-row-center gap-2"
          disabled={processing}
        >
          {processing ? (
            <>
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-200 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              processing...
            </>
          ) : (
            title
          )}
        </button>

        {/* Existing Account Info */}
        <p className="text-xs text-gray-600 mt-3">
          {existingAccountMsg}
          <Link
            to={existingAccountRedirectUrl}
            className="text-blue-700 underline"
          >
            {type === "login" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
