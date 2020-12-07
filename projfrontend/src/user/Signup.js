import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "./../auth/helper/index";

const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: false
	});

	const { name, email, password, error, success } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false });
		signup({ name, email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({
						...values,
						name: "",
						email: "",
						password: "",
						error: "",
						success: true
					});
				}
			})
			.catch((err) => console.log(err));
	};

	const signUpForm = () => {
		return (
			<div className="row">
				<div className="col-md-4 offset-sm-4 text-left">
					<form>
						<div className="form-group">
							<label className="text-lite">Name</label>
							<input
								className="form-control"
								onChange={handleChange("name")}
								type="text"
								value={name}
							/>
						</div>
						<div className="form-group">
							<label className="text-lite">Email</label>
							<input
								className="form-control"
								onChange={handleChange("email")}
								type="email"
								value={email}
							/>
						</div>
						<div className="form-group">
							<label className="text-lite">Password</label>
							<input
								className="form-control"
								onChange={handleChange("password")}
								type="password"
								value={password}
							/>
						</div>
						<button
							className="btn btn-success btn-block"
							onClick={onSubmit}
						>
							Create Account
						</button>
					</form>
				</div>
			</div>
		);
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-4 offset-sm-4 text-left">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						Account created successfully.
						<Link to="/signin">Sign</Link>
					</div>
				</div>
			</div>
		);
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-4 offset-sm-4 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	return (
		<Base title="Sign Up" description="Signup to place orders">
			{successMessage()}
			{errorMessage()}
			{signUpForm()}
		</Base>
	);
};

export default Signup;
