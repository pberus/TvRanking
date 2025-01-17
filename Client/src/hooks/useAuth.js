import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const useAuth = (setLoading) => {
  const navigate = useNavigate();
  const location = useLocation();

  const urlsPermitted = ["/auth/login", "/auth/register"];
  const urlsNotPermitted = ["/popular", "/listas", "/ranking"];
  const urlsNotPermittedStartsWith = ["/pelicula", "/serie", "/buscar"];

  //Para evaluar si tiene token o no para entrar en una ruta protegida
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios("http://localhost:3001/protected", {
          withCredentials: true,
        });
        //Si no esta autenticado, tira error. Si esta autenticado, sigo y aclaro que ruta no puedo ir si estoy autenticado
        if (urlsPermitted.some((url) => location.pathname.includes(url)))
          return navigate("/");
      } catch (error) {
        console.log("useAuth:", error);
        //Si expiro el access token, hago una solicitud para crear uno nuevo
        if (error.response?.data === "Access token expired") {
          try {
            await axios.post(
              "http://localhost:3001/refresh-token",
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
        } else {
          if (
            urlsNotPermitted.some((url) => location.pathname.includes(url)) ||
            urlsNotPermittedStartsWith.some((path) =>
              location.pathname.startsWith(path)
            ) ||
            location.pathname === "/"
          ) {
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
  }, [navigate, location.pathname, setLoading]);
};

export default useAuth;
