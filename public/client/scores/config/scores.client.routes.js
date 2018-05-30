
angular.module('scores').config(['$routeProvider', ($routeProvider) => {
  $routeProvider
  .when('/scores', {
    templateUrl: 'client/scores/views/scores.client.view.html'
  })
}])
