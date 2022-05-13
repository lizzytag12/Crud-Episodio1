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
		let product = leerProductos().find(product=> product.id === +req.params.id)
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

			id : products[products.length - 1].id + 1,
			name : name.trim(),
			price: +price,
			description : description.trim(),
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

		let products = leerProductos(); //traigo los productos

		let product = products.find(product => product.id === +req.params.id) // busco el producto que machee con el id que recibe por parametro.
		
		return res.render('product-edit-form',{

			product


		})


		
	},
	// Update - Method to update
	update: (req, res) => {



		 let products = leerProductos();

		const {name,price,discount,description,category} = req.body; 
		//desestructuro body.

		// si el id del producto machea con el que recibo por parametro,creo un nuevo obj, traigo todas sus propiedades, y modifico las que necesite.
	/*  */
		 const productoModificado = products.map(product => {
			if(product.id === +req.params.id){
				let productoModificado = {
					...product, // traigo todas las propiedades
					name: name.trim(), //piso las que quiera modificar
					description: description.trim(),
					price: +price,
					discount: +discount,
					category
				}
				return productoModificado // pido que me devuelva el producto modificado
			}
			return product 
		})
		salvarProductos(productoModificado)  //guardo el producto modificado en el JSON
		return res.redirect('/products') // Mando al usuario a la vista Productos
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {

		let products = leerProductos(); // traigo los ultimos productos

		const productosModificados = products.filter(product => product.id !== +req.params.id) // filtro los productos, y le pido que me devuelva solo los que NO coincidan con el ID que estoy recibiendo por parametro.
		
		salvarProductos(productosModificados); //guardo en el JSON los pproductos que me devolvio el filter que no tenian el ID que recibi por parametro
		return res.redirect('/products') // redirijo al usuario a la vista de productos, en el que ya no aparece el producto eliminado
	}
};

module.exports = controller;