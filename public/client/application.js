
const app = 'SUB'
const module = angular.module(app, [
  'ngResource', 'ngRoute', 'ngCookies', 'main', 'users', 'scores'
])

// Configure the hashbang URLs using the $locationProvider services
module.config(['$locationProvider', ($locationProvider) => {
  $locationProvider.hashPrefix('!')
}])

angular.element(document).ready(() => {
  angular.bootstrap(document, [app])
})
