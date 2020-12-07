import React, { useState } from "react";
import Base from "./../core/Base";
import { isAuthenticated } from "./../auth/helper/index";
import { Link } from "react-router-dom";
import { addCategory } from "./helper/adminapicall";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const { user, token } = isAuthenticated();

	const backButton = () => {
		return (
			<div className="mt-5">
				<Link
					to="/admin/dashboard"
					className="btn btn-small btn-info mb-3"
				>
					Go Back
				</Link>
			</div>
		);
	};

	const handleChange = (event) => {
		setError("");
		setName(event.target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setError("");
		setSuccess(false);
		addCategory(user._id, token, { name })
			.then((response) => {
				if (response.error) {
					setError(response.error);
				} else {
					setSuccess(true);
					setError("");
					setName("");
				}
			})
			.catch((error) => console.log(error));
	};

	const successMessage = () => {
		if (success) {
			return (
				<div>
					<div
						class="alert alert-success alert-dismissible fade show"
						role="alert"
					>
						<button
							type="button"
							class="close"
							data-dismiss="alert"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
						<strong>Category created successfully</strong>
					</div>

					<script>$(".alert").alert();</script>
				</div>
			);
		}
	};

	const errorMessage = () => {
		if (error) {
			return (
				<div>
					<div
						class="alert alert-danger alert-dismissible fade show"
						role="alert"
					>
						<button
							type="button"
							class="close"
							data-dismiss="alert"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
						<strong>{error}</strong>
					</div>

					<script>$(".alert").alert();</script>
				</div>
			);
		}
	};

	const createCategory = () => {
		return (
			<form>
				<div className="form-group pt-4">
					<h4>Enter category</h4>
					<input
						type="text"
						className="form-control my-3"
						onChange={handleChange}
						value={name}
						autoFocus
						required
						placeholder="Category Name"
					/>
					<button onClick={onSubmit} className="btn btn-outline-info">
						Add category
					</button>
				</div>
			</form>
		);
	};

	return (
		<Base
			title="Create Category"
			description="Create a new category for your products"
			className="container bg-success p-4"
		>
			<div className="row-md bg-white rounded">
				<div className="col-md-8 offset-md-2">
					<div className="container mt-3">
						{successMessage()}
						{errorMessage()}
					</div>
					{createCategory()}
					{backButton()}
				</div>
			</div>
		</Base>
	);
};

export default AddCategory;
