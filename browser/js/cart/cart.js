app.config(function($stateProvider) {

	$stateProvider
		.state('cart', {
			url:'/cart',
			templateUrl: 'js/cart/cart.html',
			controller: 'CartCtrl',
			resolve: {
				cartInfo: function (CartFactory) {
					return CartFactory.getCartInfo();	
				}
			}
		});

});

app.factory('CartFactory', function ($http) {
	return {
		getCartInfo: function (cartId) {

			// var cartContents = {};

			// return $http.get('/api/cart', {
			// 	params: cartContents
			// }).then(function(response) {

			return $http.get('/api/cart').then (function(response) {
			
				return response.data;

			});	
		}
	};
});

app.controller('CartCtrl', function ($scope, cartInfo, $http, CartFactory) {

	$scope.cartInfo = cartInfo;

	$scope.removeRow = function (productIndex) {
		$scope.cartInfo.products.splice(productIndex, 1);
	};

	$scope.deleteRow = function(productId) {
		console.log('productId', productId);

        $http.delete('api/cart/product/' + productId)
            .then(function(response) {
            	console.log('deleting product');
                CartFactory.getCartInfo().then(function(cartInfo) {
                    $scope.cartInfo = cartInfo;
                });
            }).catch(function(err) {
                console.log('delete product in cart returned err');
            });

    };

});

app.directive('borderOnHover', function(){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('mouseenter', function () {
                element.css('border','2px solid red');
            });
        }
    };
});
