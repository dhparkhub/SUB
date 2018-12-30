
angular.module('main').config(['$routeProvider', ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'client/main/views/main.client.view.html'
  })
  .when('/lucky', {
    templateUrl: 'client/main/views/lucky.client.view.html'
  })
  .when('/signup', {
    templateUrl: 'client/main/views/signup.client.view.html'
  })
  .when('/signin', {
    templateUrl: 'client/main/views/signin.client.view.html'
  })
  .otherwise({
    redirect: '/'
  })
}])
