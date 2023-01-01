import {
  Container,
  CssBaseline,
  Button,
  TextField,
  Box,
  styled,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth";

export default function Login() {
  const { signIn } = useAuth();

  const navigate = useNavigate();
  async function login(event) {
    event.preventDefault();
    const { email, password } = event.target;
    await signIn(email.value, password.value);
    navigate("/");
  }

  const Form = styled("form")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),

    justifyContent: "center",
    height: "100%",
  }));

  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "30%",
        padding: 30,
      }}
    >
      <CssBaseline />
      <Form onSubmit={login}>
        <TextField label="Email" required type="email" name="email"></TextField>
        <TextField label="Password" type="password" name="password"></TextField>
        <Button variant="contained" type="submit">
          Sign In
        </Button>
      </Form>
      <Link to="/register">New User? Register here</Link>
    </Container>
  );
}
