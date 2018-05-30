
angular.module('users').config(['$routeProvider', ($routeProvider) => {
  $routeProvider
  .when('/users', {
    templateUrl: 'client/users/views/users.client.view.html'
  })
  .when('/users/:userId', {
    templateUrl: 'client/users/views/users.client.view.html'
  })
}])
