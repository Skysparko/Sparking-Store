import { Button } from "@mui/material";
import { Box } from "@mui/material";
import {
  Paper,
  Container,
  Stepper,
  StepLabel,
  Step,
  Typography,
} from "@mui/material";

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { clearCart } from "../functions/cart-slice";

function getStepContent(activeStep) {
  switch (activeStep) {
    case 0:
      return <h1>adress</h1>;
    case 1:
      return <h1>payment</h1>;
    case 2:
      return <h1>overview</h1>;
    default:
      throw new Error("Unknown Step");
  }
}
const steps = ["Shipping Address", "Payment Details", "Review Order"];
export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <Container
      component="section"
      maxWidth="lg"
      sx={{
        mb: 4,
      }}
    >
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps?.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography>Thank you for your order</Typography>
            <Button variant="contained" onClick={() => navigate("/")}>
              Shop More
            </Button>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box>
              {activeStep > 0 && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                  }}
                >
                  Back
                </Button>
              )}

              {activeStep < steps.length - 1 && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setActiveStep(activeStep + 1);
                  }}
                >
                  Next
                </Button>
              )}

              {activeStep === steps.length - 1 && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setActiveStep(activeStep + 1);
                    dispatch(clearCart());
                  }}
                >
                  Place Order
                </Button>
              )}
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}
