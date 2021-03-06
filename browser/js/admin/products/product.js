'use strict';
var Session = {};

app.config(function ($stateProvider) {

    // Register our *product* state.
    $stateProvider
    .state('administrator.newProduct', {
        url: '/product',
        controller: 'AddProductController',
        templateUrl: 'js/admin/products/product.html',
        resolve: {
            allCategories: function (CategoriesFactory) {
                return CategoriesFactory.getCategories();
            },
            allTypes: function (TypesFactory) {
                return TypesFactory.getTypes();
            }
        }
    })
    .state('administrator.product', {
        url: '/product/:id',
        controller: 'ProductController',
        templateUrl: 'js/admin/products/product.html',
        resolve: {
            allCategories: function (CategoriesFactory) {
                return CategoriesFactory.getCategories();
            },
            allTypes: function (TypesFactory) {
                return TypesFactory.getTypes();
            }
        }
    });
});

app.factory('ProductFactory', function ($http, $stateParams) {

    return {
        getProduct: function() {
            return $http.get('/api/products/' + $stateParams.id)
                     .then(function(response) {
                return response.data;
            });
        },

    };

});

app.controller('AddProductController', function($scope, $state, $http, allCategories, allTypes, CategoriesFactory, TypesFactory) {
    
    $scope.categories = allCategories;

    $scope.types = allTypes;

    $scope.newProduct = {
        title: null,
        price: 0,
        description: null,
        type: null,
        categories: null,
        photo: 'http://upload.wikimedia.org/wikipedia/commons/c/cb/Tea_leaves_steeping_in_a_zhong_%C4%8Daj_05.jpg',
        stock: 0,
        cost: 0
    };

    $scope.addProduct = function() {

        var _idCategories = [];
        $scope.newProduct.categories.forEach(function(category, index) {
            _idCategories.push(category._id);
        });
        $scope.newProduct.categories = _idCategories;
        $scope.newProduct.type = $scope.newProduct.type._id;

        $http.post("api/products", $scope.newProduct)
        .then(function(response) {
            console.log('hi');
            $state.go('administrator.products');
        }).catch(function(err) {
            console.log('err');
        });

    };

});

app.controller('ProductController', function ($scope, $http, allCategories, allTypes, ProductFactory, CategoriesFactory, TypesFactory) {

    $scope.categories = allCategories; 
    $scope.types = allTypes;

    ProductFactory.getProduct().then(function(data) {

        $scope.product = data;

        $scope.newProduct = {
            title: data.title,
            price: data.price,
            description: data.description,
            type: data.type,
            categories: data.categories,
            photo: data.photo,
            stock: data.stock,
            cost: data.cost,
        };
            // console.log('new product: ', $scope.newProduct);

        $scope.updateProduct = function() {

            var _idCategories = [];
            $scope.newProduct.categories.forEach(function(category, index) {
                _idCategories.push(category._id);
            });
            $scope.newProduct.categories = _idCategories;
            $scope.newProduct.type = $scope.newProduct.type._id;

            $http.put("api/products/" + data._id, $scope.newProduct)
            .then (function(response) {
                console.log('hi');
            }).catch(function(err) {
                console.log('err');
            });

        };

    });
    
});











