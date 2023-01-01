import { SearchRounded } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  Autocomplete,
  TextField,
  alpha,
  styled,
  Select,
} from "@mui/material";

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth";
import { fetchAllCategories } from "../functions/categories-slice";
import { getItemCount } from "../ultis";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(10),
  marginLeft: theme.spacing(10),
  width: "100%",
  color: theme.palette.common.black,
}));

function SearchBar() {
  const products = useSelector((state) => state.products?.value);
  const categories = useSelector((state) => state.categories?.value);
  const dispatch = useDispatch();
  const [selectedCategory, setselectedCategory] = useState("all");
  const navigate = useNavigate();

  if (!categories?.length) {
    dispatch(fetchAllCategories());
  }

  function handleSearchChange(searchTerm) {
    if (searchTerm) {
      navigate(
        selectedCategory === "all"
          ? `?search=${searchTerm}`
          : `/?category=${selectedCategory}&search=${searchTerm}`
      );
    } else {
      navigate(
        selectedCategory === "all" ? "/" : `/?category=${selectedCategory}`
      );
    }
  }

  function handleSelectChange(e) {
    setselectedCategory(e.target.value);
    navigate(e.target.value === "all" ? "/" : `/?category=${e.target.value}`);
  }
  return (
    <Search>
      <Select
        value={selectedCategory}
        size="small"
        sx={{
          m: 1,
          "&": {
            textTransform: "capitalize",
          },
        }}
        labelId="selected-category"
        id="selected-category-id"
        onChange={handleSelectChange}
        variant="standard"
      >
        <MenuItem sx={{ textTransform: "capitalize" }} value="all" key="all">
          all
        </MenuItem>
        {categories?.map((category) => (
          <MenuItem
            value={category}
            sx={{ textTransform: "capitalize" }}
            id={category}
            key={category}
          >
            {category}
          </MenuItem>
        ))}
      </Select>

      <Autocomplete
        fullWidth={true}
        popupIcon=""
        sx={{
          "& .MuiOutlinedInput-root ": {
            border: "none",
          },
          ".MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        onChange={(e, value) => handleSearchChange(value?.label)}
        id="combo-box-demo"
        options={Array.from(
          selectedCategory === "all"
            ? products
            : products.filter((prod) => prod.category === selectedCategory),
          (prod) => ({
            id: prod.id,
            label: prod.title,
          })
        )}
        renderInput={(params) => <TextField {...params} />}
      />
      <IconButton>
        <SearchRounded />
      </IconButton>
    </Search>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart?.value);
  const cartItemsCount = getItemCount(cartItems);
  const { user, signOutUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  function handleCartClick() {
    navigate("/cart");
  }

  function handleProfileMenuOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  async function logOut() {
    await signOutUser();
    navigate("/login");
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logOut}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
            }}
          >
            S.Store
          </Typography>
          <SearchBar />
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            <IconButton
              aria-label="Shopping Cart"
              color="inherit"
              onClick={handleCartClick}
            >
              <Badge badgeContent={cartItemsCount} color="error" showZero>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <Button onClick={handleProfileMenuOpen} color="inherit">
                {user.displayName ?? user.email}
              </Button>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
}
