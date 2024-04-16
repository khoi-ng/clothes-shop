const CART_SESSION_STORAGE = 'CART_SESSION_STORAGE';

export interface CartProduct {
  name: string;
  id: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CartStorage {
  cartProducts: CartProduct[];
  quantity: number;
}

export function addProductToCart(product: CartProduct) {
  const sessionCartString = sessionStorage.getItem(CART_SESSION_STORAGE);

  let cart: CartStorage = {
    cartProducts: [],
    quantity: 0,
  };

  if (sessionCartString) {
    cart = JSON.parse(sessionCartString);
  }

  const productIndex = cart.cartProducts.findIndex(
    (cartProduct) => cartProduct.id === product.id
  );
  if (productIndex !== -1) {
    cart.cartProducts[productIndex].quantity += 1;
    cart.quantity += 1;
  } else {
    cart.cartProducts.push({
      name: product.name,
      id: product.id,
      quantity: 1,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    cart.quantity += 1;
  }
  sessionStorage.setItem(CART_SESSION_STORAGE, JSON.stringify(cart));
  return cart;
}

export function getCart() {
  const sessionCartString = sessionStorage.getItem(CART_SESSION_STORAGE);

  let cart: CartStorage = {
    cartProducts: [],
    quantity: 0,
  };

  if (sessionCartString) {
    cart = JSON.parse(sessionCartString);
  }

  return cart;
}

export function removeProductfromCart(product: CartProduct) {
  const sessionCartString = sessionStorage.getItem(CART_SESSION_STORAGE);
  if (sessionCartString) {
    const cart: CartStorage = JSON.parse(sessionCartString);
    const cartProduct: CartProduct | undefined = cart.cartProducts.find(
      (cProduct) => cProduct.id == product.id
    );
    if (cartProduct) {
      const newCartProducts = cart.cartProducts.filter(
        (cartProduct) => cartProduct.id !== product.id
      );
      cart.quantity -= cartProduct.quantity;
      cart.cartProducts = newCartProducts;

      sessionStorage.setItem(CART_SESSION_STORAGE, JSON.stringify(cart));
      return cart;
    }
  }
}

export function decrementQuantityProduct(product: CartProduct) {
  const sessionCartString = sessionStorage.getItem(CART_SESSION_STORAGE);
  if (sessionCartString) {
    const cart: CartStorage = JSON.parse(sessionCartString);
    const productIndex = cart.cartProducts.findIndex(
      (cartProduct) => cartProduct.id === product.id
    );

    if (productIndex !== -1) {
      if (cart.cartProducts[productIndex].quantity <= 0) {
        removeProductfromCart(cart.cartProducts[productIndex]);
      } else {
        cart.cartProducts[productIndex].quantity -= 1;
        cart.quantity -= 1;
        sessionStorage.setItem(CART_SESSION_STORAGE, JSON.stringify(cart));
      }
    }
    return cart;
  }
}

export function deleteAllCartProducts() {
  const cart: CartStorage = {
    cartProducts: [],
    quantity: 0,
  };
  sessionStorage.setItem(CART_SESSION_STORAGE, JSON.stringify(cart));
}
