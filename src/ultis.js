export function getItemCount(cartItems) {
  return cartItems.reduce((count, cartItem) => cartItem.quantity + count, 0);
}

export function getSubTotal(cartItems) {
  return cartItems.reduce(
    (sum, { Product, quantity }) =>
      parseInt(Product.price * 81) * quantity + sum,
    0
  );
}
