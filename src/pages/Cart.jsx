import React from "react";
import {
  Card,
  Grid,
  CardMedia,
  Typography,
  useTheme,
  CardActions,
  Button,
  Rating,
  CardContent,
  Container,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { getSubTotal } from "../ultis";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../functions/cart-slice";
import { useDispatch } from "react-redux";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart?.value);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subTotal = getSubTotal(cartItems);

  function handleQuantityChange(e, { Product, quantity }) {
    const changedQuantity = e.target.valueAsNumber;
    if (changedQuantity < quantity) {
      dispatch(removeFromCart({ Product }));
    } else {
      dispatch(addToCart({ Product }));
    }
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cartItems?.map(({ Product, quantity }) => {
            const { title, id, description, price, image, rating } = Product;
            console.log(Product);
            return (
              <Grid item key={id} xs={12}>
                <Card
                  sx={{
                    py: 2,
                    display: "flex",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      pt: theme.spacing(),
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography>{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form>
                        <TextField
                          id={`${id}_product-id`}
                          type="number"
                          inputProps={{ min: 0, max: 10 }}
                          variant="standard"
                          label="Quantity"
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(e, { Product, quantity })
                          }
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        ₹{getSubTotal([{ Product, quantity }])}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Card
              sx={{
                padding: 2,
                display: "flex",
                gap: 2,
                flexDirection: "column",
              }}
            >
              <Typography variant="h3" component="h3">
                SubTotal
              </Typography>
              <Typography variant="h4" component="h4">
                ₹{subTotal}
              </Typography>
              {subTotal > 0 ? (
                <Button
                  variant="contained"
                  onClick={() => navigate("/checkout")}
                >
                  Buy Now
                </Button>
              ) : (
                <Button variant="contained" onClick={() => navigate("/")}>
                  Shop Now
                </Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
