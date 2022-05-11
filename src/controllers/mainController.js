const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/**
 * The function takes a number as an argument and returns a string with a dot as a thousand separator.
 */
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
	/* Filtering the products that have the category "visited" and saving them in the variable
	productosVisited. */
		let productosVisited = products.filter(product =>product.category === 'visited'); 
	/* Filtering the products that have the category "in-sale" and saving them in the variable
		productosInSale. */
		let productosInSale = products.filter(product =>product.category === 'in-sale');

	/* Returning the index view with the products that have the category "visited" and "in-sale". */
		return res.render('index',{

			productosVisited,
			productosInSale
		})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
