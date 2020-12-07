import React, { useState, useEffect } from "react";
import Base from "./../core/Base";
import { Link } from "react-router-dom";
import {
	getAllCategory,
	getProduct,
	updateProduct
} from "./helper/adminapicall";
import { isAuthenticated } from "./../auth/helper/index";

const UpdateProduct = ({ match }) => {
	const { user, token } = isAuthenticated();
	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		stock: 0,
		photo: "",
		categories: [],
		category: "",
		loading: false,
		error: false,
		createdProduct: "",
		redirect: false,
		formData: ""
	});

	const [cateName, setCategory] = useState("");

	const {
		name,
		description,
		price,
		stock,
		photo,
		categories,
		category,
		loading,
		error,
		createdProduct,
		redirect,
		formData
	} = values;

	const preloadCategories = () => {
		getAllCategory()
			.then((data) => {
				console.log(data);
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						categories: data,
						formData: new FormData()
					});
				}
			})
			.catch((err) => console.log(err));
	};

	const preload = (productId) => {
		getProduct(productId)
			.then((data) => {
				console.log(data);
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					console.log(data.category._id);
					preloadCategories();
					setValues({
						...values,
						name: data.name,
						description: data.description,
						price: data.price,
						category: data.category._id,
						stock: data.stock,
						formData: new FormData()
					});
					setCategory(data.category.name);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		preload(match.params.productId);
	}, []);

	//TODO
	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });
		updateProduct(match.params.productId, user._id, token, formData)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						...values,
						name: "",
						description: "",
						price: "",
						photo: "",
						stock: 0,
						loading: false,
						category: "",
						createdProduct: data.name
					});
				}
			})
			.catch((error) => console.log(error));
	};

	const handleChange = (name) => (event) => {
		const value =
			name === "photo" ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const successMessage = () => (
		<div
			className="alert alert-success mt-3"
			style={{ display: createdProduct ? "" : "none" }}
		>
			<h4>{createdProduct} updated successfully.</h4>
		</div>
	);

	const errorMessage = () => {
		return (
			<div
				className="alert alert-danger mt-3"
				style={{ display: error ? "" : "none" }}
			>
				<h4>Failed to update {createdProduct}</h4>
			</div>
		);
	};

	const backButton = () => {
		return (
			<div className="mt-5">
				<Link
					to="/admin/products"
					className="btn btn-small btn-info mb-3"
				>
					Go Back
				</Link>
			</div>
		);
	};

	const createProductForm = () => (
		<form style={{ overflow: "auto" }}>
			<h4>Enter Product</h4>
			<div className="form-group pt-4">
				<span>Post photo</span>
				<label className="btn btn-block btn-success">
					<input
						onChange={handleChange("photo")}
						type="file"
						name="photo"
						accept="image"
						placeholder="choose a file"
					/>
				</label>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("name")}
					name="photo"
					className="form-control"
					placeholder="Name"
					value={name}
				/>
			</div>
			<div className="form-group">
				<textarea
					onChange={handleChange("description")}
					name="photo"
					className="form-control"
					placeholder="Description"
					value={description}
				/>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("price")}
					type="number"
					className="form-control"
					placeholder="Price"
					value={price}
				/>
			</div>
			<div className="form-group">
				<select
					onChange={handleChange("category")}
					className="form-control"
					placeholder="Category"
					value={category}
				>
					<option>Select</option>
					{categories &&
						categories.map((cate, index) => (
							<option key={index} value={cate._id}>
								{cate.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("stock")}
					type="number"
					className="form-control"
					placeholder="Quantity"
					value={stock}
				/>
			</div>

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3"
			>
				Update Product
			</button>
		</form>
	);

	return (
		<Base
			title="Update Product"
			description="Update a product"
			className="container bg-success p-4"
		>
			<div className="row-md bg-white rounded">
				<div className="col-md-8 offset-md-2">
					{successMessage()}
					{errorMessage()}
					{createProductForm()}
					{backButton()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateProduct;
