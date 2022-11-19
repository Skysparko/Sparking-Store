import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
} from "@mui/material";

import React from "react";

export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
          }}
        >
          S.Store
        </Typography>
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        >
          <IconButton aria-label="Shopping Cart" color="inherit">
            <Badge badgeContent={0} color="error" showZero>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
