import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutAuthUserThunk } from "../redux/slices/authSlice";
import { axiosPublic } from "../config/axios";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = useCallback(async () => {
    try {
      const response = await axiosPublic.get("/auth/refresh");
      const { accessToken, user } = response.data.data;
      // update the auth state with new access token & user info
      dispatch(loginSuccess({ accessToken, user }));
      return accessToken;
    } catch (err) {
      // refresh token failed to receive a new access token, so logout the user
      if (err?.response?.status === 403) {
        dispatch(logoutAuthUserThunk());
      }
    }
  }, [dispatch]);

  return refresh;
};

export default useRefreshToken;
