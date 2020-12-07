import React, { useState, useEffect } from "react";
import { isAuthenticated } from "./../auth/helper/index";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "./../backend";
import { createOrder } from "./helper/orderHelper";
import { emptyCart } from "./helper/cartHelper";

const StripeCheckout = ({
	products,
	setRefresh = function (val) {
		return val;
	},
	refresh = undefined
}) => {
	const [data, setData] = useState({
		loading: false,
		success: false,
		error: "",
		address: ""
	});

	const token = isAuthenticated() && isAuthenticated().token;
	const UserToken = isAuthenticated() && isAuthenticated().token;
	const userId = isAuthenticated() && isAuthenticated().user._id;

	const getFinalPrice = () => {
		let amount = 0;
		products.map((product) => {
			amount += product.price;
		});
		return amount;
	};

	const finalAmount = getFinalPrice();

	const makePayment = (token) => {
		const body = {
			token,
			finalAmount
		};
		const headers = {
			"Content-Type": "application/json"
		};
		return fetch(`${API}/stripe/checkout`, {
			method: "POST",
			headers,
			body: JSON.stringify(body)
		})
			.then((response) => {
				const status = response.status;
				console.log(response);
				console.log(status);
				const orderData = {
					products: products,
					transaction_id: response.id,
					amount: response.amount,
					user: isAuthenticated().user
				};
				createOrder(userId, UserToken, orderData);
				emptyCart(() => {
					console.log("Got a crash");
				});
				setRefresh(!refresh);
			})
			.catch((err) => console.log(err));
	};

	const showStripe = () => {
		return isAuthenticated() && products.length > 0 ? (
			<StripeCheckoutButton
				stripeKey="pk_test_51HWLlcIcnpmYAi2tTtInv3tYECr9jErTosvtqrr2vluWZu9fLG58lQBoQg81jp7nVhHQTffGQrYfKgIbTTBjUemz00QLsCMH0S"
				token={makePayment}
				amount={getFinalPrice() * 100}
				name="Buy your products"
				shippingAddress
				billingAddress
				currency="INR"
			>
				<button className="btn btn-success">Pay with Stripe</button>
			</StripeCheckoutButton>
		) : (
			<Link to="/signin">
				<button className="btn btn-warning">
					Please sign in to purchase
				</button>
			</Link>
		);
	};

	return (
		<div>
			<h3 className="text-white">Stripe Loaded {getFinalPrice()}</h3>
			{showStripe()}
		</div>
	);
};

export default StripeCheckout;
