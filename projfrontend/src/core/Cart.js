import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base.js";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import BraintreeCheckout from "./BraintreeCheckout";

const Cart = () => {
	const [products, setProducts] = useState([]);

	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		setProducts(loadCart());
	}, [refresh]);

	const loadAllProducts = (products) => {
		return (
			<div>
				{products.map((product, index) => {
					return (
						<Card
							key={index}
							product={product}
							removeFromCart={true}
							addToCart={false}
							setRefresh={setRefresh}
							refresh={refresh}
						/>
					);
				})}
			</div>
		);
	};

	const loadCheckouts = (products) => {
		return (
			<div>
				<StripeCheckout products={products} setRefresh={setRefresh} />
				{/* <BraintreeCheckout
					products={products}
					setRefresh={setRefresh}
				/> */}
			</div>
		);
	};

	return (
		<Base title="Cart Page" description="Checkout your products">
			<div className="row text-center">
				<div className="col-6">
					{products.length > 0 ? (
						loadAllProducts(products)
					) : (
						<h3>No items in cart</h3>
					)}
				</div>
				<div className="col-6">
					{products.length > 0 ? (
						loadCheckouts(products)
					) : (
						<h3>No items in cart</h3>
					)}
				</div>
			</div>
		</Base>
	);
};

export default Cart;
