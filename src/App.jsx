import { useState } from "react";

function App() {
  const [products] = useState([
    { id: 1, name: "Shoes", price: 2000 },
    { id: 2, name: "T-Shirt", price: 800 },
    { id: 3, name: "Watch", price: 5000 },
    { id: 4, name: "Headphones", price: 1500 },
  ]);

  const [cart,setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart,product]);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>E-Commerce App</h1>

      <h2>Cart Items : {cart.length}</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default App;
