import {
  Typography,
  Snackbar,
  Alert,
  Button,
  Menu,
  IconButton,
  MenuItem,
  Avatar,
  Divider,
  Card,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import { useHistory } from "react-router";
import base_url from "../devpro/Baseurl";
import { signout } from "../auth/auth";

const UserInfo = (params) => {
  console.log(params);
  const theme = useTheme();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [userValues, setUserValue] = useState({
    src: "",
    name: "",
    bio: "",
    phone: "",
    email: "",
    password: "",
  });

  const [snack, setSnack] = useState({
    fault: false,
    message: "",
    severity: "success",
  });

  const handleClose = () => {
    setSnack({ ...snack, fault: false });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const updateSnack = (msg) => {
    console.log(msg);
    setSnack({
      ...snack,
      fault: true,
      message: msg,
      severity: "success",
    });
    params.location.state = false;
    // setTimeout(() => {
    //   setSnack({
    //     ...snack,
    //     fault: false,
    //   });
    //   params.location.state = false;
    // }, 3000);
  };

  useEffect(() => {
    async function getUser() {
      await axios
        .get(`${base_url}userinfo`, {
          params: {
            id: `${params.match.params.id}`,
          },
        })
        .then((res) => {
          const { bio, name, email, phone, src } = res.data.user;
          console.log(bio, name, email, phone);
          const ar = src.startsWith("https://") ? src.split(":") : src;
          console.log(ar[0]);
          setUserValue({
            src: ar[0] !== "https" ? `${base_url}` + ar[0] : src,
            name: name === undefined ? userValues.name : name,
            email: email === undefined ? userValues.email : email,
            bio:
              bio === undefined || bio === "undefined" ? userValues.bio : bio,
            phone: phone === undefined ? userValues.phone : phone,
          });
          console.log(userValues);
          console.log(res);
        })
        .catch((err) => console.log(err));

      if (params.location.params !== undefined) {
        updateSnack("Success login");
      }
      if (params.location.state) {
        updateSnack("Update Success");
        params.location.state = false;
      }
      console.log("user info useeffect");
    }
    getUser();
    console.log("user info ");
  }, [params.location.params, params.match.params.id]);

  return (
    <>
      <Box
        sx={{
          color: "white",
          position: "relative",
          top: { xs: "-4.6rem", lg: "-5rem" },
          width: "12%",
          marginLeft: "auto",
          right: { xs: "3rem", lg: "9rem" },
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar
            alt="avatar"
            src={userValues.src}
            sx={{
              width: { xs: "35px", lg: "40px" },
              height: { xs: "35px", lg: "40px" },
            }}
          />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          sx={{ top: "4rem", left: "-8px", width: "13rem" }}
        >
          <MenuItem onClick={handleCloseMenu}>
            <AccountCircle sx={{ marginRight: "1rem" }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <GroupIcon sx={{ marginRight: "1rem" }} />
            Group chat
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              signout(() => {
                history.push({
                  pathname: "/",
                  params: {
                    fault: true,
                    message: "logout",
                  },
                });
              });
            }}
          >
            <LogoutIcon sx={{ marginRight: "1rem" }} />
            logout
          </MenuItem>
        </Menu>
      </Box>

      <Box sx={{ position: "relative", top: "-3rem" }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Noto Sans",
            fontSize: " 2.5rem",
            color: theme.palette.mode === "light" ? "black" : "white",
          }}
        >
          Personal Info
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Noto Sans",
            color: theme.palette.mode === "light" ? "black" : "white",
          }}
        >
          Basic info like your name and photo
        </Typography>
      </Box>
      <Card sx={{ width: { lg: "60%", sm: "100%" }, margin: "auto" }}>
        <Card
          sx={{
            display: "inline-flex",
            height: "6rem",
            width: "100%",
            p: "1rem",
            pl: { lg: "3rem" },
            alignItems: "self-start",
            pr: { lg: "3rem" },
          }}
        >
          <div style={{ textAlign: "left", flex: "1" }}>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1.5rem", lg: "2.125rem" } }}
            >
              Profile
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#828282",
                fontWeight: "400",
                fontSize: { xs: "0.8rem", lg: "0.875rem" },
              }}
            >
              Some info may be visible to other people
            </Typography>
          </div>
          <Card sx={{ borderRadius: "1rem" }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "1rem",
                width: { xs: "5rem", lg: "6rem" },
                color: "#828282",
                border: "1px solid #828282",
                lineHeight: { xs: "1.5", lg: "1.75" },
              }}
              onClick={() => {
                history.push({
                  pathname: `/editUser/${params.match.params.id}`,
                });
              }}
            >
              Edit
            </Button>
          </Card>
        </Card>
        <Divider />
        <Card
          sx={{
            width: "100%",
            display: "inline-flex",
            pl: { lg: "3rem" },
            p: "1rem",
            height: "8rem",
            alignItems: "center",
          }}
        >
          <Box textAlign="left" sx={{ width: { xs: "7rem", lg: "18rem" } }}>
            <Typography
              fontFamily="Noto Sans"
              sx={{ fontWeight: "600", color: "#BDBDBD" }}
            >
              Photo
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: "5rem", lg: "6rem" },
              height: { xs: "5rem", lg: "6rem" },
            }}
          >
            <img
              src={userValues.src}
              alt="profile"
              width="100%"
              height="100%"
            />
          </Box>
        </Card>
        <Divider />
        <Card
          sx={{
            width: "100%",
            display: "inline-flex",
            pl: { lg: "3rem" },
            p: "1rem",
            height: "8rem",
            alignItems: "center",
          }}
        >
          <Box textAlign="left" sx={{ width: { xs: "7rem", lg: "18rem" } }}>
            <Typography
              fontFamily="Noto Sans"
              sx={{ fontWeight: "600", color: "#BDBDBD" }}
            >
              Name
            </Typography>
          </Box>
          <Typography
            variant="h5"
            fontFamily="Noto Sans"
            sx={{
              overflowWrap: "anywhere",
              fontSize: { xs: "1.2rem", lg: "1.5rem" },
            }}
          >
            {userValues.name}
          </Typography>
        </Card>
        <Divider />
        <Card
          sx={{
            width: "100%",
            display: "inline-flex",
            pl: { lg: "3rem" },
            p: "1rem",
            height: "8rem",
            alignItems: "center",
          }}
        >
          <Box textAlign="left" sx={{ width: { xs: "7rem", lg: "18rem" } }}>
            <Typography
              fontFamily="Noto Sans"
              sx={{ fontWeight: "600", color: "#BDBDBD" }}
            >
              Bio
            </Typography>
          </Box>
          <Typography
            variant="h5"
            fontFamily="Noto Sans"
            sx={{
              overflowWrap: "anywhere",
              fontSize: { xs: "1.2rem", lg: "1.5rem" },
            }}
          >
            {userValues.bio}
          </Typography>
        </Card>
        <Divider />
        <Card
          sx={{
            width: "100%",
            display: "inline-flex",
            pl: { lg: "3rem" },
            p: "1rem",
            height: "8rem",
            alignItems: "center",
          }}
        >
          <Box textAlign="left" sx={{ width: { xs: "7rem", lg: "18rem" } }}>
            <Typography
              fontFamily="Noto Sans"
              sx={{ fontWeight: "600", color: "#BDBDBD" }}
            >
              Phone
            </Typography>
          </Box>
          <Typography
            variant="h5"
            fontFamily="Noto Sans"
            sx={{ fontSize: { xs: "1.2rem" } }}
          >
            {userValues.phone}
          </Typography>
        </Card>
        <Divider />
        <Card
          sx={{
            width: "100%",
            display: "inline-flex",
            pl: { lg: "3rem" },
            p: "1rem",
            height: "8rem",
            alignItems: "center",
          }}
        >
          <Box textAlign="left" sx={{ width: { xs: "8.5rem", lg: "18rem" } }}>
            <Typography
              fontFamily="Noto Sans"
              sx={{ fontWeight: "600", color: "#BDBDBD" }}
            >
              Email
            </Typography>
          </Box>
          <Typography
            variant="h5"
            fontFamily="Noto Sans"
            sx={{
              overflowWrap: "anywhere",
              fontSize: { xs: "1.2rem", lg: "1.5rem" },
            }}
          >
            {userValues.email}
          </Typography>
        </Card>
        <Divider />
        <Card
          sx={{
            width: "100%",
            display: "inline-flex",
            pl: { lg: "3rem" },
            p: "1rem",
            height: "8rem",
            alignItems: "center",
          }}
        >
          <Box textAlign="left" sx={{ width: { xs: "7rem", lg: "18rem" } }}>
            <Typography
              fontFamily="Noto Sans"
              sx={{ fontWeight: "600", color: "#BDBDBD" }}
            >
              Password
            </Typography>
          </Box>
          <Typography variant="h5" fontFamily="Noto Sans">
            **********
          </Typography>
        </Card>
        <Divider />
      </Card>
      <Snackbar
        open={snack.fault}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert variant="filled" severity={snack.severity} onClose={handleClose}>
          {snack.severity}
          {" : "}
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserInfo;
