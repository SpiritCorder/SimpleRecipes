import { useSelector, useDispatch } from "react-redux";

import Brand from "../Brand";
import NavbarLink from "../NavbarLink";

import {
  MdLogin,
  MdLockPerson,
  MdAdd,
  MdLogout,
  MdOutlineRefresh,
} from "react-icons/md";

import {
  selectAuthInfo,
  logoutAuthUserThunk,
} from "../../redux/slices/authSlice";

const Navbar = () => {
  const authInfo = useSelector(selectAuthInfo);
  const dispatch = useDispatch();

  return (
    <nav className="fixed top-0 left-0 w-screen bg-red-600 py-2 h-[60px]">
      <div className="custom-container flex-row-between">
        <Brand />
        {authInfo.accessToken && authInfo.user && (
          <span className="text-white text-sm font-semibold">
            🐱‍🏍 Welcome back #{authInfo?.user?.username}
          </span>
        )}
        <div className="flex-row-center gap-12 text-white">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-900 rounded-sm text-sm"
            onClick={() => window.location.reload(true)}
          >
            <MdOutlineRefresh />
            Refresh Page
          </button>
          {authInfo.accessToken && authInfo.user && (
            <>
              <NavbarLink icon={MdAdd} text="Add a recipe" path="/add-recipe" />
              <button
                className="flex-row-center gap-2"
                onClick={() => dispatch(logoutAuthUserThunk())}
              >
                <MdLogout />
                Logout
              </button>
            </>
          )}
          {!authInfo.accessToken && !authInfo.user && (
            <>
              <NavbarLink
                icon={MdLockPerson}
                text="Register"
                path="/register"
              />
              <NavbarLink icon={MdLogin} text="Login" path="/login" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
