import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { authenticate } from "../redux/actions";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const useAuth = (setLoading) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  //Para evaluar si tiene token o no para entrar en una ruta protegida
  useEffect(() => {
    const urlsNotPermitted = ["/auth/login", "/auth/register"];
    const checkAuth = async () => {
      try {
        const { data } = await axios(URL + "/protected", {
          withCredentials: true,
        });
        //Si no esta autenticado, tira error. Si esta autenticado, sigo y aclaro que ruta no puedo ir si estoy autenticado
        if (urlsNotPermitted.some((url) => location.pathname.includes(url)))
          return navigate("/");

        dispatch(authenticate(data));
      } catch (error) {
        console.log("useAuth:", error);
        //Si expiro el access token, hago una solicitud para crear uno nuevo
        if (error.response?.data === "Access token expired") {
          try {
            await axios.post(
              URL + "/refresh-token",
              {},
              { withCredentials: true }
            );
            return await checkAuth();
          } catch (error) {
            navigate("/auth/login");
            toast.error(
              error.response && error.response.data
                ? error.response.data
                : error.message,
              {
                position: "top-center",
              }
            );
          }
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, location.pathname, setLoading, dispatch]);
};

export default useAuth;
