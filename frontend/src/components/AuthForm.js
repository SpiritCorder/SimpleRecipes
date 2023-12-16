import { useState } from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";

const AuthForm = ({ title, type }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const existingAccountMsg =
    type === "login" ? "Don't have an account? " : "Already have an account? ";
  const existingAccountRedirectUrl = type === "login" ? "/register" : "/login";

  return (
    <div className="flex flex-col gap-5 w-[350px] px-8 py-8 bg-white shadow-lg rounded-md">
      {/* Brand */}
      <div className="flex-row-center">
        <Brand />
      </div>
      {/* Title */}
      <h1 className="text-2xl font-semibold">{title}</h1>
      {/* Form  */}
      <form>
        {/* Username Input */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 relative pb-2">
            <label
              className="block  tracking-wide text-gray-500 text-xs font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="username"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p
              className={`absolute bottom-0 left-0 px-3 text-red-500 text-xs italic`}
            >
              Some error message here
            </p>
          </div>
        </div>
        {/* Password Input */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 relative pb-2">
            <label
              className="block  tracking-wide text-gray-500 text-xs font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p
              className={`absolute bottom-0 left-0 px-3 text-red-500 text-xs italic`}
            >
              Some error message here
            </p>
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
