// This custom hook will attach axios interceptors (both request & response interceptors)
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../redux/slices/authSlice";
import { axiosPrivate } from "../config/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const accessToken = useSelector(selectAccessToken);
  const refresh = useRefreshToken();

  useEffect(() => {
    // attach interceptors
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          // set Authorization header
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest.sent) {
          // access token might have expired, so use refresh token to get a new access token & retry the previous failed request
          prevRequest.sent = true;
          const accessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
