import { ShoppingCartSharp } from "@mui/icons-material";
import { Card } from "@mui/material";
import { Grid } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { IconButton } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { Rating } from "@mui/material";
import { CardContent } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const theme = useTheme();

  async function FetchingAllProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    const result = await res.json();
    setProducts(result);
  }

  useEffect(() => {
    FetchingAllProducts();
  }, []);
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {products.map(({ title, id, description, price, image, rating }) => (
          <Grid item key={id} xs={12} sm={6} md={3}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
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
                <Button variant="contained">
                  <ShoppingCartSharp />
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
