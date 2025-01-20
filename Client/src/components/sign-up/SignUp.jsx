import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { GoogleIcon, FacebookIcon } from "./components/CustomIcons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "fixed",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const navigate = useNavigate();

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Por favor ingrese un email valido.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "La contraseña tiene que tener por lo menos 6 caracteres."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("El nombre es requerido.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (nameError || emailError || passwordError) {
        return;
      }

      const formData = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
      };
      const { data } = await axios.post(
        "http://localhost:3001/auth",
        formData,
        { withCredentials: true }
      );
      toast.success(data);
      navigate("/");
    } catch (error) {
      error.response.data
        ? toast.error(error.response.data)
        : toast.error(error);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction='column' justifyContent='space-between'>
        <Card variant='outlined'>
          <Typography
            component='h1'
            variant='h4'
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Regístrate
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor='name'>Nombre completo</FormLabel>
              <TextField
                autoComplete='name'
                name='name'
                required
                fullWidth
                id='name'
                placeholder='Barry Allen'
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                required
                fullWidth
                id='email'
                placeholder='ejemplo@email.com'
                name='email'
                autoComplete='email'
                variant='outlined'
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Contraseña</FormLabel>
              <TextField
                required
                fullWidth
                name='password'
                placeholder='••••••'
                type='password'
                id='password'
                autoComplete='new-password'
                variant='outlined'
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value='allowExtraEmails' color='primary' />}
              label='Quiero recibir actualizaciones por email.'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              onClick={validateInputs}
            >
              Regístrate
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>o</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() =>
                window.location.replace("http://localhost:3001/auth/google")
              }
              startIcon={<GoogleIcon />}
            >
              Regístrate con Google
            </Button>

            <Button
              fullWidth
              variant='outlined'
              onClick={() => alert("Regístrate con Facebook")}
              startIcon={<FacebookIcon />}
            >
              Regístrate con Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              ¿Ya tienes una cuenta?{" "}
              <Link
                href='/auth/login'
                variant='body2'
                sx={{ alignSelf: "center" }}
              >
                Iniciar sesión
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
