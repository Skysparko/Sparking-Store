import { styled } from "@mui/material";
import { Container, CssBaseline, Button, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth";

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  async function register(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await signUp(data.get("email"), data.get("password"), data.get("name"));
    navigate("/login");
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
      <Form onSubmit={register}>
        <TextField label="Name" type="name" name="name"></TextField>
        <TextField label="Email" required type="email" name="email"></TextField>
        <TextField
          label="Password"
          required
          type="password"
          name="password"
        ></TextField>
        <Button variant="contained" type="submit">
          Register
        </Button>
      </Form>
      <Link to="/login">Already have an account? Login here</Link>
    </Container>
  );
}
