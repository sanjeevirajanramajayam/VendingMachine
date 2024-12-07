function ShoppingCartCard(props) {
    return (
        <>
            <div className="shopping-cart-card">
                <img src="https://placehold.jp/150x150.png"></img>

                    <div className="item-content">
                        <h3>{props.name}</h3>
                        <p className="price-tag">$ {props.price}</p>
                        <p>Quantity: {props.quantity}</p>
                    </div>
            </div>
        </>
    )
}

export default ShoppingCartCard