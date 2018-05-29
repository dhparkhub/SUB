
angular.module('main').controller('MainController', [
  '$scope', '$http', 'Authentication', ($scope, $http, Authentication) => {

    $scope.user = Authentication

    $scope.signup = () => {
      $http({
        method: 'POST',
        url: '/signup',
        data: {
          email: $scope.email,
          username: $scope.username,
          password: $scope.password
        }
      }).then((response) => {
        // console.log('After signup success: ', response)
        location.href = '/'
      }, (errorResponse) => {
        // console.log('After signup error: ', errorResponse)
        $scope.error = errorResponse.data.message
      })
    }

  }
])
