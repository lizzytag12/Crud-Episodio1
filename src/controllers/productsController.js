const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/**
 * It takes a number, converts it to a string, adds commas to it, and returns the result
 */
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	/* A function that is being exported to the controller.js file. */
	/* renderizo a la vista productos los productos que tengo y mando el metodo toThousand */
	index: (req, res) => {
	 return res.render('products',{
		 products,
		 toThousand

	 })
	},

	// Detail - Detail from one product
	/* A function that is being exported to the controller.js file. It is rendering the view detail and
	sending the product and the method toThousand. */
	detail: (req, res) => {
		const product = products.find(product=> product.id === +req.params.id)
		return res.render('detail',{

			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;