import React, { useState, useEffect } from "react"
import ShoppingCartCard from "./ShoppingCartCard";

function ProductCard(props) {

    const [quantity, setQuantity] = useState(0);

    const stock = props.stock - quantity;

    function handleQuantityChange(event) {
        if (quantity <= props.stock) {
            setQuantity(event.target.value);
        }
    }

    useEffect(() => { /* We can get the updated value of a stateful variable using useEffect */
        addToCart()
    }, [quantity])

    const addToCart = () => {
        console.log(quantity)
        props.addToCart({ name: props.name, quantity, price: props.price, }); /* We can pass props value and stateful variables from here to App use prop functions. */
    };

    const ProductCardHtml = <div className="product-item">
        <img src="https://placehold.jp/150x150.png"></img>
        <h3>{props.name}</h3>
        <p className="price-tag">$ {props.price}</p>
        <input type="number" max={props.stock} min="0" placeholder="0" onChange={handleQuantityChange}></input>
        <p>Stock : {stock}</p>
    </div>

    return (
        ProductCardHtml
    )
}

ProductCard.defaultProps = {
    name: "Product Item",
    price: 10,
    stock: 10
}


export default ProductCard