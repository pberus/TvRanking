import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Login, PersonAdd } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openNotAuthenticateListsModal } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "90vh", // Limita la altura máxima al 90% de la ventana
  overflowY: "auto", // Habilita el scroll vertical si el contenido excede la altura
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NotAuthenticateListsModal() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notAuthenticateListsModal = useSelector(
    (state) => state.notAuthenticateListsModal
  );

  useEffect(() => {
    notAuthenticateListsModal && setOpen(true);
  }, [notAuthenticateListsModal]);

  const handleCloseModal = () => {
    setOpen(false);
    dispatch(openNotAuthenticateListsModal(false));
  };

  const handleLogin = () => {
    handleCloseModal();
    navigate("/auth/login");
  };

  const handleRegister = () => {
    handleCloseModal();
    navigate("/auth/register");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='d-flex justify-content-between'>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              <strong>¡Para usar listas necesitas una cuenta!</strong>
            </Typography>
            <button
              onClick={handleCloseModal}
              className='bg-transparent border-0 text-secondary'
            >
              {<CloseIcon />}
            </button>
          </div>
          <p>
            Descubre un mundo de posibilidades con nuestras listas
            personalizadas:
          </p>
          <ul>
            <li>
              Crea tu <strong>Watchlist</strong> y nunca pierdas de vista lo que
              quieres ver.
            </li>
            <li>
              Lleva un registro de todo lo que has <strong>Visto</strong> y
              revive tus momentos favoritos.
            </li>
            <li>
              Guarda tus películas y series favoritas en tu lista de{" "}
              <strong>Me gusta</strong>.
            </li>
          </ul>
          <p>
            ¡Organiza, descubre y disfruta de tu entretenimiento como nunca
            antes!
          </p>
          <button
            className='w-100 d-flex gap-2 justify-content-center bg-dark fw-medium text-white mb-3 rounded border-0 p-2'
            onClick={handleLogin}
          >
            <Login />
            Iniciar sesión
          </button>
          <button
            className='w-100 d-flex gap-2 justify-content-center bg-white fw-medium rounded border p-2'
            onClick={handleRegister}
          >
            <PersonAdd />
            Crear cuenta
          </button>
        </Box>
      </Modal>
    </div>
  );
}
