import React, { useState, useEffect } from "react";
import Base from "./../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./../auth/helper/index";
import { getAllCategory } from "./helper/adminapicall";

const ManageCategories = () => {
	const [categories, setCategory] = useState([]);
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

	const preload = () => {
		getAllCategory()
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setCategory(data);
				}
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		preload();
	}, []);

	const loadCategories = () => {
		return (
			<div className="row">
				<div className="col-12">
					<h2 className="text-center text-white my-3">
						{`Total ${categories.length} products`}
					</h2>
					{categories.map((cate, index) => {
						return (
							<div key={index} className="row text-center mb-2 ">
								<div className="col-4">
									<h3 className="text-white text-left">
										{cate.name}
									</h3>
								</div>
								<div className="col-4">
									<Link
										className="btn btn-success"
										to={`/admin/category/update/${cate._id}`}
									>
										<span className="">Edit</span>
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	return (
		<Base
			title="Manage Categories"
			description="Edit existing Categories here"
		>
			<h2 className="mb-4">All categories:</h2>
			{backButton()}
			{loadCategories()}
		</Base>
	);
};

export default ManageCategories;
