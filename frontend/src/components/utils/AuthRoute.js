import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { selectAuthInfo } from "../../redux/slices/authSlice";

const AuthRoute = () => {
  const authInfo = useSelector(selectAuthInfo);

  if (!authInfo.accessToken || !authInfo.user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthRoute;
