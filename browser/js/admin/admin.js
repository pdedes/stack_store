'use strict';
app.config(function ($stateProvider) {

    // Register our *admin* state.
    $stateProvider.state('administrator', {
        url: '/administrator',
        controller: 'AdminController',
        templateUrl: 'js/admin/admin.html'
        // ,
        // resolve: {
        //     userAccount: function (UserFactory) {
        //         return UserFactory.getUser();
        //     }
        // }
    });

});

// app.factory('UserFactory', function ($http) {
//     return {
//         getUser: function() {
//             var userId = Session.user; // get logged-in user's id
//             return $http.get('/api/users/:id', {
//                         params: userId })
//                      .then(function(response) {
//                 return response.data;
//             });
//         }
//     };
// });

// app.controller('AdminController', function ($scope, AuthService) {

//     $scope.userAccount = userAccount;

// });
















