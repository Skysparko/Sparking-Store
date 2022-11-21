import { ShoppingCartSharp } from "@mui/icons-material";
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
} from "@mui/material";

import React from "react";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../functions/cart-slice";
import { useSelector } from "react-redux";
import { FetchAllProducts } from "../functions/products-slice";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("search");
  const productsState = useSelector((state) => state.products);
  const { value: products, loading } = productsState ?? {};
  const theme = useTheme();
  const dispatch = useDispatch();

  if (!products?.length) {
    dispatch(FetchAllProducts());
  }
  let filteredProducts =
    category && category !== "all"
      ? products.filter((prod) => prod.category === category)
      : products;

  filteredProducts = searchTerm
    ? filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;
  function addProductToCart(Product) {
    //dispatch on action
    dispatch(addToCart({ Product, quantity: 1 }));
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {filteredProducts?.map(
          ({ title, id, description, price, image, rating }) => (
            <Grid item key={id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={image}
                  alt={title}
                  sx={{
                    alignSelf: "center",
                    width: theme.spacing(30),
                    height: theme.spacing(30),
                    objectFit: "contain",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h5"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {description}
                  </Typography>
                  <Typography fontSize="large" paragraph>
                    ₹{parseInt(price * 81)}
                  </Typography>
                  <Rating readOnly precision={0.5} value={rating.rate} />
                </CardContent>
                <CardActions sx={{ alignSelf: "center" }}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      addProductToCart({
                        title,
                        id,
                        description,
                        price,
                        image,
                        rating,
                      })
                    }
                  >
                    <ShoppingCartSharp />
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
}
