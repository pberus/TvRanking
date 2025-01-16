import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Container
      className='text-center d-flex flex-column align-items-center justify-content-center'
      style={{ height: "80vh" }}
    >
      <Typography
        variant='h1'
        component='h1'
        gutterBottom
        className='text-danger'
      >
        404
      </Typography>
      <Typography variant='h5' component='h2' gutterBottom>
        Oops! Pagina no encontrada.
      </Typography>
      <Typography variant='body1' gutterBottom>
        La pagina que estas buscando ya no existe o fue movida.
      </Typography>
      <Button
        variant='contained'
        color='primary'
        className='mt-3'
        onClick={goHome}
      >
        Volver al Inicio
      </Button>
    </Container>
  );
};

export default Error;
