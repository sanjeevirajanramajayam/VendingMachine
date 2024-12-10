import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react"
import ShoppingCartCard from "./ShoppingCartCard";

function ProductCard(props, ref) {

    const [quantity, setQuantity] = useState(0);
    const InputRef = useRef();
    const stock = props.stock - quantity;

    function handleQuantityChange(event) {
        if (quantity <= props.stock) {
            setQuantity(event.target.value);
        }
    }

    function handleReset() {
        setQuantity(0);
        InputRef.current.value = 0;
    }

    useImperativeHandle(ref, () => ({
        handleReset,
    }));

    useEffect(() => { /* We can get the updated value of a stateful variable using useEffect */
        addToCart()
    }, [quantity])

    const addToCart = () => {
        props.addToCart({ name: props.name, quantity, price: props.price, }); /* We can pass props value and stateful variables from here to App use prop functions. */
    };

    const ProductCardHtml = <div className="product-item">
        <img src={props.image}></img>
        <h3>{props.name}</h3>
        <p className="price-tag">₹ {props.price}</p>
        <input ref={InputRef} type="number" max={props.stock} min="0" placeholder="0" onChange={handleQuantityChange}></input>
        <p>Stock : {stock}</p>
    </div>

    return (
        ProductCardHtml
    )
}

ProductCard.defaultProps = {
    image: "https://placehold.jp/150x150.png",
    name: "Product Item",
    price: 10,
    stock: 10
}


export default React.forwardRef(ProductCard)