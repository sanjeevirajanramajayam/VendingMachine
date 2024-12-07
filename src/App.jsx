import ProductCard from "./ProductCard"
import ShoppingCartCard from "./ShoppingCartCard"
import React, { useState, useEffect } from "react"

function App() {

  const styles = {
    paddingLeft: "30px"
  }

  const [totalCost, setTotalCost] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(() => {
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name); /* Returns the index position of the element that fufills the test */
      if (existingItemIndex > -1) {
        const updatedItems = [...cartItems];
        if (item.quantity > 0) {
          updatedItems[existingItemIndex].quantity = item.quantity;
        }
        else {
          updatedItems.splice(existingItemIndex, 1);
        }
        return updatedItems;
      } else {
        if (item.quantity > 0) {
          return [...cartItems, item];
        }
        else{
          return []
        }
      }
    });
  };

  function TotalCart() {
    var arrayLength = cartItems.length;
    let total = 0;
    for (var i = 0; i < arrayLength; i++) {
      total += (cartItems[i].price * cartItems[i].quantity);
    }
    setTotalCost(total);
  }

  useEffect(() => { /* We can get the updated value of a stateful variable using useEffect */
    TotalCart()
  }, [cartItems])

  return (
    <>
      <div className="product-container">
        <ProductCard name="Chips" price={20} stock={10} addToCart={addToCart}/>
        <ProductCard name="Chocolate" price={10} stock={15} addToCart={addToCart} />
        <ProductCard name="Lays" price={20} stock={10} addToCart={addToCart}/>
      </div>

      <h1 style={styles}>Your Shopping Cart: ${totalCost}</h1>
      <p style={styles}>Your items: </p>

      <div className="shopping-cart">
        {cartItems.map((item, index) => (
          <ShoppingCartCard key={index} name={item.name} quantity={item.quantity} price={item.price} />
        ))}
      </div>

    </>
  )
}

export default App
