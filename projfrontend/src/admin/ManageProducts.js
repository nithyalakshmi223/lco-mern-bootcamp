import React, { useState, useEffect } from "react";
import Base from "./../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./../auth/helper/index";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
	const [products, setProducts] = useState([]);
	const { user, token } = isAuthenticated();
	const backButton = () => {
		return (
			<div className="mt-5">
				<Link
					to="/admin/dashboard"
					className="btn btn-small btn-info mb-3"
				>
					Admin Dashboard
				</Link>
			</div>
		);
	};

	const preload = () => {
		getAllProducts()
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setProducts(data);
				}
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		preload();
	}, []);

	const loadProducts = () => {
		return (
			<div className="row">
				<div className="col-12">
					<h2 className="text-center text-white my-3">
						{`Total ${products.length} products`}
					</h2>
					<div className="table-responsive">
						<table className="table table-light table-hover">
							<thead className="thead-light">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Edit</th>
									<th scope="col">Delete</th>
								</tr>
							</thead>
							<tbody>
								{products.map((prod, index) => {
									return (
										<tr key={index} scope="row">
											<th scope="row">{index + 1}</th>
											<td>{prod.name}</td>
											<td>
												<Link
													to={`/admin/product/update/${prod._id}`}
												>
													<i
														className="far fa-edit"
														style={{
															color: "#28A745"
														}}
													></i>
												</Link>
											</td>
											<td>
												<i
													className="far fa-trash-alt"
													style={{
														color: "#DC3545"
													}}
													onClick={() => {
														deleteThisProduct(
															prod._id
														);
													}}
												></i>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	};

	const deleteThisProduct = (productId) => {
		deleteProduct(productId, user._id, token)
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					preload();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Base
			title="Manage Products"
			description="Manage existing products here"
		>
			<h2 className="mb-4">All products:</h2>
			{backButton()}
			{loadProducts()}
		</Base>
	);
};

export default ManageProducts;
