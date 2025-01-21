import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./components/ForgotPassword";
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
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function SignIn(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (emailError || passwordError) {
        return;
      }
      const email = event.target.email.value;
      const password = event.target.password.value;

      const { data } = await axios(
        `http://localhost:3001/auth?email=${email}&password=${password}`,
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

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

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

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction='column' justifyContent='space-between'>
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant='outlined'>
          <Typography
            component='h1'
            variant='h4'
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Iniciar sesión
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id='email'
                type='email'
                name='email'
                placeholder='ejemplo@email.com'
                autoComplete='email'
                autoFocus
                required
                fullWidth
                variant='outlined'
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Contraseña</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name='password'
                placeholder='••••••'
                type='password'
                id='password'
                autoComplete='current-password'
                autoFocus
                required
                fullWidth
                variant='outlined'
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <Link
              component='button'
              type='button'
              onClick={handleClickOpen}
              variant='body2'
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <ForgotPassword open={open} handleClose={handleClose} />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Recuérdame'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              onClick={validateInputs}
            >
              Iniciar sesión
            </Button>
          </Box>
          <Divider>o</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() =>
                window.location.replace("http://localhost:3001/auth/google")
              }
              startIcon={<GoogleIcon />}
            >
              Iniciar sesión con Google
            </Button>
            <Button
              fullWidth
              variant='outlined'
              onClick={() =>
                window.location.replace("http://localhost:3001/auth/facebook")
              }
              startIcon={<FacebookIcon />}
            >
              Iniciar sesión con Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              ¿No tienes una cuenta?{" "}
              <Link
                href='/auth/register'
                variant='body2'
                sx={{ alignSelf: "center" }}
              >
                Regístrate
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
