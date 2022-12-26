import React, {useState, useContext, useEffect} from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Button,
} from "@mui/material";
import {MessageOutlined, MenuOutlined} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {doc, onSnapshot} from "firebase/firestore";

import {AuthContext} from "../context/AuthContext";
import {db} from "../firebase";

const pages = ["Home"];
const linkTo = ["/"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState({});

  const {currentUser, dispatch} = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      setUser(doc.data());
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser.uid]);

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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MessageOutlined sx={{display: {xs: "none", md: "flex"}, mr: 1}} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: {xs: "none", md: "flex"},
              fontFamily: "monospace",
              fontWeight: 700,
            }}
          >
            <Link to="/" style={{textDecoration: "none", color: "white"}}>
              Messenger Clone
            </Link>
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuOutlined />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              sx={{
                display: {xs: "block", md: "none"},
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none"}} to={linkTo[i]}>
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MessageOutlined sx={{display: {xs: "flex", md: "none"}, mr: 1}} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: {xs: "flex", md: "none"},
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
            }}
          >
            <Link to="/" style={{textDecoration: "none", color: "white"}}>
              Messenger Clone
            </Link>
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
            {pages.map((page, i) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{my: 2, color: "white", display: "block"}}
              >
                <Link
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                  to={linkTo[i]}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt={user?.name} src={user?.img} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: "45px"}}
              id="menu-appbar"
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
              <MenuItem divider onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {user?.name}
                </Typography>
              </MenuItem>
              <MenuItem divider onClick={() => dispatch({type: "LOGOUT"})}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  From: {user.country}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
