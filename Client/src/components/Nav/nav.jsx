import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/logotipo_tv_ranking.png";
import SearchBar from "../SearchBar/searchBar";
import axios from "axios";
import { toast } from "react-toastify";
import { authenticate, removeLists } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import style from "./nav.module.css";

const theme = (color) =>
  createTheme({
    palette: {
      primary: {
        main: color,
      },
    },
  });

const pages = ["Inicio", "Popular", "Listas"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutFunction = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/logout",
        {},
        { withCredentials: true }
      );
      dispatch(authenticate(data));
      dispatch(removeLists());
      toast.success("Cierre de sesion exitoso");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`${location.pathname === "/" ? style.home : "border-bottom"}`}
    >
      <ThemeProvider
        theme={
          location.pathname === "/"
            ? theme("rgba(0, 0, 0, 0.2)")
            : theme("#333333")
        }
      >
        <AppBar position='static' color='primary'>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <div className='w-50 d-flex align-items-center'>
                <Typography
                  variant='h6'
                  noWrap
                  component='a'
                  href='/'
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "-moz-initial",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={logo}
                    alt='logo tv ranking'
                    height='60'
                    width='80'
                    className='p-1'
                  />
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleOpenNavMenu}
                    color='inherit'
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: "block", md: "none" } }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography sx={{ textAlign: "center" }}>
                          {page === "Inicio" ? (
                            <a href='/' style={{ textDecoration: "none" }}>
                              {page}
                            </a>
                          ) : (
                            <a
                              href={`/${page.toLowerCase()}`}
                              style={{ textDecoration: "none" }}
                            >
                              {page}
                            </a>
                          )}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Typography
                  variant='h5'
                  noWrap
                  component='a'
                  href='/'
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={logo}
                    alt='logo tv ranking'
                    height='30'
                    width='30'
                  />
                  <span className='ps-2'>Tv Ranking</span>
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page === "Inicio" ? (
                        <a
                          href='/'
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {page}
                        </a>
                      ) : (
                        <a
                          href={`/${page.toLowerCase()}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {page}
                        </a>
                      )}
                    </Button>
                  ))}
                </Box>
              </div>
              <div className='w-50 d-flex align-items-center justify-content-end'>
                <Box sx={{ flexGrow: 1, width: "50%" }}>
                  <SearchBar />
                </Box>
                <Box sx={{ flexGrow: 0, marginRight: 1, width: "50%" }}>
                  {!isAuthenticated ? (
                    <div>
                      <Button
                        sx={{
                          backgroundColor: "white",
                          border: 1,
                          marginRight: 1,
                          color: "black",
                        }}
                        onClick={() => navigate("/auth/login")}
                      >
                        Iniciar sesion
                      </Button>
                      <Button
                        sx={{ color: "white", border: 1 }}
                        onClick={() => navigate("/auth/register")}
                      >
                        Registrarse
                      </Button>
                    </div>
                  ) : (
                    <Button
                      sx={{
                        color: "black",
                        border: 1,
                        backgroundColor: "white",
                      }}
                      onClick={logoutFunction}
                    >
                      Cerrar sesion
                    </Button>
                  )}
                </Box>
                {/* MENU CUENTA (configurar)
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title='Open settings'>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id='menu-appbar'
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography sx={{ textAlign: "center" }}>
                            {setting}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                */}
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
export default Nav;
