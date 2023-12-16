import { useState } from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";

import {
  validateUsername,
  validatePassword,
} from "../validators/authValidators";

const AuthForm = ({ title, type }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const existingAccountMsg =
    type === "login" ? "Don't have an account? " : "Already have an account? ";
  const existingAccountRedirectUrl = type === "login" ? "/register" : "/login";

  // form submit handler
  const handleFormSubmit = async (e) => {
    // prevent the default form submission bahaviour
    e.preventDefault();

    // reset the error state
    setError({ username: "", password: "" });

    // validate inputs (client side validation)
    const usernameRes = validateUsername(username);
    const passwordRes = validatePassword(password);

    if (usernameRes !== "" || passwordRes !== "") {
      setError({ username: usernameRes, password: passwordRes });
      return;
    }

    // if no errors, send the request to the backend API with credentials
    alert("Send the credentials to the API");
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
        <button className="bg-red-500 px-4 py-2 text-white rounded-md">
          {title}
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
