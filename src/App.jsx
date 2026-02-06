import { useEffect, useState } from "react";

function App() {
  const [products] = useState([
    { id: 1, name: "Shoes", price: 2000 },
    { id: 2, name: "T-Shirt", price: 800 },
    { id: 3, name: "Watch", price: 5000 },
    { id: 4, name: "Headphones", price: 1500 },
  ]);

  // Load Cart from local storage
  const [cart,setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  })

  // save cart to local storage
  useEffect(()=> {
    localStorage.setItem("cart",JSON.stringify(cart))
  })

  // Add Cart
  const addToCart = (product) => {
    const exist = cart.find((item) => item.id == product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Increase Qty
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  // Decerase Qty
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item,
      ),
    );
  };

  // Total

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>E-Commerce App</h1>

      <h2>Cart Items : {cart.length}</h2>

      <h3>Products</h3>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}

      <hr />

      <h3>Cart</h3>
      {cart.length === 0 && <p>Cart is empty</p>}
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} - {item.price} * {item.qty}
          <button onClick={() => increaseQty(item.id)}>+</button>
          <button onClick={() => decreaseQty(item.id)}>-</button>
        </div>
      ))}

      <h2>Total : ₹{totalPrice}</h2>

      <button disabled={cart.length === 0}>Checkout</button>
    </div>
  );
}

export default App;
