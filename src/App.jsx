import ProductCard from "./ProductCard"
import ShoppingCartCard from "./ShoppingCartCard"
import React, { useState, useEffect, useRef } from "react"
import Payment from "./Payment"

function App() {

  const styles = {
    paddingLeft: "30px"
  }

  const [totalCost, setTotalCost] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [VendingMachine, setVendingMachine] = useState([
    { name: "Kurkure", price: 20, stock: 15, image: "src/assets/Kurkure_140x150.png" },
    { name: "Lays", price: 30, stock: 5, image:"src/assets/Lays_150x122-removebg-preview_184x150.png"},
    { name: "Munch", price: 10, stock: 20, image:"src/assets/munch_140x150.png" },
    { name: "Pepsi", price: 40, stock: 10, image:"src/assets/pepsi_150x150.webp" },
    { name: "Coke", price: 35, stock: 12, image:"src/assets/coke_100x150-removebg-preview.png" },
    { name: "Sprite", price: 25, stock: 8, image:"src/assets/sprite_124x150-removebg-preview.png" },
    { name: "Oreos", price: 50, stock: 12, image:"src/assets/oreos_150x102-removebg-preview_221x150.png" },
    { name: "Doritos", price: 45, stock: 7, image:"src/assets/doritos_150x150-removebg-preview.png" },
    { name: "Red Bull", price: 60, stock: 5, image:"src/assets/redbull_150x150-removebg-preview.png" },
    { name: "Snickers", price: 25, stock: 20, image:"src/assets/snickers_107x150-removebg-preview.png" },
    { name: "Gatorade", price: 35, stock: 10, image:"src/assets/gatorade_150x150-removebg-preview.png" },
    { name: "KitKat", price: 30, stock: 15, image:"src/assets/kitkat_150x150-removebg-preview.png" }
  ]);
  

  const childRefs = useRef([]);

  function BuyCart() {
    for (let i in VendingMachine) {
      for (let j in cartItems) {
        if (VendingMachine[i].name == cartItems[j].name) {
          const updatedObj = [...VendingMachine];
          updatedObj[i].stock -= cartItems[j].quantity;
          setVendingMachine(updatedObj);
        }
      }
    }
  }

  const ResetFunction = () => {
    setCartItems([]);
    BuyCart();
    childRefs.current.forEach((ref, _) => {
      if (ref) {
        ref.handleReset(); 
      }
    });
  };

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
        else {
          return [...cartItems];
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
        {VendingMachine.map((item, index) => (
          <ProductCard image={item.image} key={index} name={item.name} stock={item.stock} price={item.price} addToCart={addToCart} ref={(el) => (childRefs.current[index] = el)}></ProductCard>
        ))}
      </div>
      <h1 style={styles}>Your Shopping Cart: ₹{totalCost}</h1>
      <p style={styles}>Your items: </p>
      <div className="shopping-cart">
        {cartItems.map((item, index) => (
          <ShoppingCartCard key={index} name={item.name} quantity={item.quantity} price={item.price} />
        ))}
      </div>
      <Payment func={ResetFunction} total={totalCost} />
    </>
  )
}


export default App



