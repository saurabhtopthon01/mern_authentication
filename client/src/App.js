import React from "react";
import { Route, Switch } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EditUser from "./components/Edituser";
import { AppBar, Hidden, Toolbar, Typography } from "@mui/material";
import UserInfo from "./components/UserInfo";
import Activate from "./components/Activate";
import dlogo from "./resources/devchallenges-light.svg";
import logo from "./resources/devchallenges.svg";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = React.useState("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" sx={{ px: "1rem" }}>
          <Toolbar sx={{ px: { xs: 0, lg: 2 } }}>
            <Box
              sx={{
                width: { xs: "150px", lg: "192px" },
                position: "relative",
                top: "3px",
              }}
            >
              {theme.palette.mode === "light" ? (
                <img src={logo} alt="logo" width="100%" />
              ) : (
                <img src={dlogo} alt="dark logo" width="100%" />
              )}
            </Box>
            <Box
              sx={{
                textAlign: "right",
                height: "2rem",
                flex: "1",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Box
                sx={{
                  border: `1px solid ${
                    theme.palette.mode === "dark" ? "yellow" : "black"
                  }`,
                  color: theme.palette.mode === "dark" ? "yellow" : "black",
                  height: "2rem",
                  width: { xs: "2rem", lg: "10rem" },
                  display: "inline-flex",
                  justifyContent: "center",
                  borderRadius: "0.5rem",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={colorMode.toggleColorMode}
              >
                <Box sx={{ display: { xs: "none", lg: "block" } }}>
                  {theme.palette.mode} mode
                </Box>
                <IconButton
                  sx={{ ml: { xs: 0, lg: 1 }, pr: 0, pl: { xs: 0, lg: 1 } }}
                  color="inherit"
                >
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            bgcolor: "background.default",
            textAlign: "center",
            p: "1rem",
            pb: 3,
          }}
        >
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/userInfo/:id" component={UserInfo}></Route>
            <Route
              path="/activate/:token"
              render={(props) => <Activate {...props} />}
            />
            <Route
              path="/editUser/:id"
              render={(props) => <EditUser {...props} />}
            />
            <Route path="/" render={(props) => <Signup {...props} />}></Route>
          </Switch>
          <Box
            display="inline-flex"
            justifyContent="left"
            alignItems="center"
            color="gray"
            sx={{
              m: "auto",
              width: { lg: "40%", sm: "100%" },
              textAlign: "left",
            }}
          >
            <Typography sx={{ flex: "1" }}>Create by Saurabh</Typography>
            <Typography>devChallenges.io</Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
