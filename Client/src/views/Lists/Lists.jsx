import { useEffect } from "react";
import { TabsLists } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllLists } from "../../redux/actions";
import {
  PersonOutline,
  BookmarkBorder,
  Lock,
  Visibility,
  FavoriteBorder,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Lists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    isAuthenticated.authenticated && dispatch(getAllLists());
  }, [dispatch, isAuthenticated]);

  return (
    <div>
      {isAuthenticated.authenticated ? (
        <TabsLists />
      ) : (
        <div className='p-5 bg-dark'>
          <div className='d-flex flex-column border rounded p-3 mb-3 bg-white text-dark'>
            <h3>¡Descubre las listas personalizadas!</h3>
            <p>
              Organiza tus películas y series favoritas, lleva un registro de lo
              que has visto y nunca pierdas de vista lo que quieres ver a
              continuación.
            </p>
            <p className='d-flex gap-1'>
              <PersonOutline />
              Inicia sesión para desbloquear todas las funciones
            </p>
          </div>
          <div className='d-flex justify-content-around mb-3 w-100 flex-column flex-md-row gap-1'>
            <div
              className='p-2 border border-secondary rounded opacity-75 bg-secondary-subtle p-4 w-100'
              style={{ width: "30%" }}
            >
              <div className='d-flex justify-content-between'>
                <h4>Watchlist</h4>
                <BookmarkBorder />
              </div>
              <p className='text-secondary'>
                Películas y series que quieres ver
              </p>
              <div className='d-flex flex-column align-items-center'>
                <strong className='pb-1'>Inicia sesión para acceder</strong>
                <Lock fontSize='large' color='action' />
              </div>
            </div>
            <div
              className='p-2 border border-secondary rounded opacity-75 bg-secondary-subtle p-4 w-100'
              style={{ width: "30%" }}
            >
              <div className='d-flex justify-content-between'>
                <h4>Visto</h4>
                <Visibility />
              </div>
              <p className='text-secondary'>
                Películas y series que ya has visto
              </p>
              <div className='d-flex flex-column align-items-center'>
                <strong className='pb-1'>Inicia sesión para acceder</strong>
                <Lock fontSize='large' color='action' />
              </div>
            </div>
            <div
              className='p-2 border border-secondary rounded opacity-75 bg-secondary-subtle p-4 w-100'
              style={{ width: "30%" }}
            >
              <div className='d-flex justify-content-between'>
                <h4>Me gusta</h4>
                <FavoriteBorder />
              </div>
              <p className='text-secondary'>Tus películas y series favoritas</p>
              <div className='d-flex flex-column align-items-center'>
                <strong className='pb-1'>Inicia sesión para acceder</strong>
                <Lock fontSize='large' color='action' />
              </div>
            </div>
          </div>
          <div className='text-center'>
            <button
              onClick={() => navigate("/auth/login")}
              className='mb-2 mt-3 p-2 rounded border bg-white text-dark'
            >
              Iniciar sesión
            </button>
            <p className='text-white'>
              ¿No tienes una cuenta?{" "}
              <Link
                to={"/auth/register"}
                className='text-white fw-medium text-decoration-none'
              >
                Regístrate aqui
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lists;
