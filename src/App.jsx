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
    // <div className="p-10 bg-gray-200 min-h-screen">
    //   <h1>E-Commerce App</h1>

    //   <h2>Cart Items : {cart.length}</h2>

    //   <h3>Products</h3>

    //   {products.map((product) => (
    //     <div key={product.id}>
    //       <h3>{product.name}</h3>
    //       <p>{product.price}</p>

    //       <button onClick={() => addToCart(product)}>Add to Cart</button>
    //     </div>
    //   ))}

    //   <hr />

    //   <h3>Cart</h3>
    //   {cart.length === 0 && <p>Cart is empty</p>}
    //   {cart.map((item) => (
    //     <div key={item.id}>
    //       {item.name} - {item.price} * {item.qty}
    //       <button onClick={() => increaseQty(item.id)}>+</button>
    //       <button onClick={() => decreaseQty(item.id)}>-</button>
    //     </div>
    //   ))}

    //   <h2>Total : ₹{totalPrice}</h2>

    //   <button disabled={cart.length === 0}>Checkout</button>
    // </div>


  <div className="p-10 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-5">E-Commerce App</h1>

    <h2 className="text-xl mb-5">
      Cart Items: {cart.length}
    </h2>

    {/* PRODUCTS */}
    <h3 className="text-2xl font-semibold mb-3">Products</h3>

    <div className="grid grid-cols-2 gap-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white p-5 rounded shadow"
        >
          <h3 className="text-lg font-bold">
            {product.name}
          </h3>

          <p className="text-gray-600">
            ₹{product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>

    <hr className="my-6" />

    {/* CART */}
    <h3 className="text-2xl font-semibold mb-3">Cart</h3>

    {cart.length === 0 && <p>Cart is empty</p>}

    {cart.map((item) => (
      <div
        key={item.id}
        className="bg-white p-4 mb-3 rounded shadow flex justify-between"
      >
        <span>
          {item.name} — ₹{item.price} × {item.qty}
        </span>

        <div>
          <button
            onClick={() => increaseQty(item.id)}
            className="bg-green-500 text-white px-2 rounded mr-2"
          >
            +
          </button>

          <button
            onClick={() => decreaseQty(item.id)}
            className="bg-red-500 text-white px-2 rounded"
          >
            -
          </button>
        </div>
      </div>
    ))}

    <h2 className="text-2xl font-bold mt-5">
      Total: ₹{totalPrice}
    </h2>

    <button
      disabled={cart.length === 0}
      className="bg-purple-600 text-white px-6 py-3 mt-4 rounded disabled:bg-gray-400"
    >
      Checkout
    </button>
  </div>



    
  );
}

export default App;
