'use strict';

var router = require('express').Router();
var stripe = require("stripe")(
	"sk_test_nHFUXc5ELdKZCqA6bU6qlAIr"
);

var mongoose = require('mongoose');

var ProductModel = mongoose.model('Product');
var CartModel = mongoose.model('Cart');
var UserModel = mongoose.model('User');
var OrderModel = mongoose.model('Order');

module.exports = router;

router.post('/', function(req, res, next) {

	var amount = req.body.amount;
	var source = 'tok_15zEPPL5vWGrXymrbUhkH4bL';
	var	description = "Cart Number: " + req.body._id;
	var idempotency_key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    return v.toString(16);
	});

    console.log("ID_KEY: ", idempotency_key);

	stripe.charges.create({
		amount: amount,
		currency: 'usd',
		source: source,
		description: description
	}, {
		idempotency_key: idempotency_key
	}, function(err, charge) {
		if(err) {
			console.log("Stripe POST failed: ", err);
		} else {
			console.log("Stripe POST Success: ", charge);
		};
	});

});










