import { API } from "../../backend";

//Category Calls
//Add a category
export const addCategory = (userId, token, category) => {
	const bearerToken = `Bearer ${token}`;
	console.log(bearerToken);
	return fetch(`${API}/category/create/${userId}`, {
		method: "POST",
		headers: {
			Authorization: bearerToken,
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(category)
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};

// Get all categories
export const getAllCategory = () => {
	return fetch(`${API}/categories`, {
		method: "GET"
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};

//Get a category
export const getCategory = (categoryId) => {
	return fetch(`${API}/category/${categoryId}`, {
		method: "GET"
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};

//update a product
export const updateCategory = (categoryId, userId, token, category) => {
	const bearerToken = `Bearer ${token}`;
	return fetch(`${API}/category/update/${categoryId}/${userId}`, {
		method: "PUT",
		headers: {
			Authorization: bearerToken,
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(category)
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};

//delete a category
export const deleteCategory = (categoryId, userId, token) => {
	const bearerToken = `Bearer ${token}`;
	return fetch(`${API}/category/delete/${categoryId}/${userId}`, {
		method: "DELETE",
		headers: {
			Authorization: bearerToken,
			Accept: "application/json"
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};

//Product calls
// Create a new product
export const createProduct = (userId, token, product) => {
	const bearerToken = `Bearer ${token}`;
	return fetch(`${API}/product/create/${userId}`, {
		method: "POST",
		headers: {
			Authorization: bearerToken,
			Accept: "application/json"
		},
		body: product
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};

// Get all Products
export const getAllProducts = () => {
	return fetch(`${API}/products`, {
		method: "GET"
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};

//get a product
export const getProduct = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: "GET"
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};

//update a product
export const updateProduct = (productId, userId, token, product) => {
	const bearerToken = `Bearer ${token}`;
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "PUT",
		headers: {
			Authorization: bearerToken,
			Accept: "application/json"
		},
		body: product
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};

//delete a product
export const deleteProduct = (productId, userId, token) => {
	const bearerToken = `Bearer ${token}`;
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "DELETE",
		headers: {
			Authorization: bearerToken,
			Accept: "application/json"
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => console.log(error));
};
