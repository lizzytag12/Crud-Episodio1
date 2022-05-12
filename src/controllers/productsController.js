const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');



const leerProductos=()=>{

	
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); 
	return products
}

/* funcion para guardar productos */
const salvarProductos=(products)=>fs.writeFileSync(productsFilePath, JSON.stringify(products,null,3))


/**
 * It takes a number, converts it to a string, adds commas to it, and returns the result
 */
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");




const controller = {



	// Root - Show all products
	/* A function that is being exported to the controller.js file. */
	/* renderizo a la vista productos los productos que tengo y mando el metodo toThousand */
	index: (req, res) => {

		let products = leerProductos()

	    return res.render('products',{
		 products,
		 toThousand

	    })
	},



	// Detail - Detail from one product
	/* A function that is being exported to the controller.js file. It is rendering the view detail and
	sending the product and the method toThousand. */
	detail: (req, res) => {
		const product = leerProductos().find(product=> product.id === +req.params.id)
		return res.render('detail',{

			product,
			toThousand
		})
	},



	// Create - Form to create
	create: (req, res) => {
		/* Rendering the view product-create-form. */
		return res.render ('product-create-form')
	},
	
	
	
	// Create -  Method to store
	store: (req, res) => {

	    /* Reading the products from the database. */
		let products = leerProductos()

		/* Destructuring the req.body object. */
		const {name,price,discount,description,category} = req.body;

	    /* Creating a new product with the data that the user is sending. */
		let nuevoProducto={

			id : products[products.length - 1].id +1,
			name : name.trim(),
			description : description.trim(),
			price: +price,
			discount : +discount,
			image : "default-image.png",
			category



		}
     /* Adding the new product to the array of products. */
		products.push(nuevoProducto)

		/* Saving the products in the database. */
		salvarProductos(products)



		/* Redirecting the user to the products page. */
		return res.redirect('/products');
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