var mongoose = require('mongoose');
var ProductModel = mongoose.model('Product');
var optionsSchema = require('./options');

//MAKE SURE TO FIX THE PRODUCTID FIELD BACK TO OBJECTID, SWITCHED FOR TESTING AND SEEDING...
var schema = new mongoose.Schema({
	session: String,
	products: [{
		productId: { type: mongoose.Schema.Types.String, ref: 'Product'},
		options: [optionsSchema],
		quantity: Number,
		price: Number
	}],
	subTotal: Number,
	tax: Number,
	total: Number
});

schema.methods.getPrice = function() {
	if (this.products.length) {
		this.products.forEach(function(product) {
			ProductModel.findById(product.productId, function(err, p) {
				product.price = p.price;
			});
		});
	}
};

schema.methods.getSubTotal = function() {
	var productsTotal = 0;
	if (this.products.length) {
		this.products.forEach(function(product) {
			ProductModel.findById(product.productId, function(err, p) {
				productsTotal += p.price;
			});
		});
	}
	this.subTotal = productsTotal;
};

schema.methods.calculateTax = function() {
// calculate tax based on tax table
};

schema.methods.calculateTotal = function() {
	var cartTotal = this.subTotal + this.tax;
	this.total = cartTotal;
};

// module.exports = schema;

mongoose.model('Cart', schema);




