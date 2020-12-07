import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router-dom";

const Card = ({
	product,
	addToCart = true,
	removeFromCart = false,
	setRefresh = function (val) {
		return val;
	},
	refresh = undefined
}) => {
	const [redirect, setRedirect] = useState(false);

	const cardTitle = product ? product.name : "Dummy Title";
	const cardDesc = product ? product.description : "Dummy Description";
	const cardPrice = product ? product.price : "$0.99";

	const addProdToCart = () => {
		addItemToCart(product, () => setRedirect(true));
	};

	const getRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	const showAddToCart = (addToCart) => {
		return (
			addToCart && (
				<button
					onClick={addProdToCart}
					className="btn btn-block btn-outline-success mt-2 mb-2"
				>
					Add to Cart
				</button>
			)
		);
	};

	const showRemoveFromCart = (removeFromCart) => {
		return (
			removeFromCart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id);
						setRefresh(!refresh);
					}}
					className="btn btn-block btn-outline-danger mt-2 mb-2"
				>
					Remove from Cart
				</button>
			)
		);
	};

	return (
		<div className="card text-white bg-dark border border-info ">
			<div className="card-header lead">{cardTitle}</div>
			<div className="card-body">
				{getRedirect(redirect)}
				<ImageHelper product={product} />
				<p className="lead bg-success font-weight-normal text-wrap">
					{cardDesc}
				</p>
				<p className="btn btn-success rounded  btn-sm px-4">
					$ {cardPrice}
				</p>
				<div className="row">
					<div className="col-12">{showAddToCart(addToCart)}</div>
					<div className="col-12">
						{showRemoveFromCart(removeFromCart)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
