
angular.module('main').controller('MainController', [
  '$scope', '$http', '$cookies', 'Authentication', ($scope, $http, $cookies, Authentication) => {

    $scope.user = Authentication
    $scope.users = []
    $scope.email = $cookies.get('email')

    // 회원가입
    $scope.signup = () => {
      alert('테스트 하지마라, 신재용!')
      // $http({
      //   method: 'POST',
      //   url: '/signup',
      //   data: {
      //     email: $scope.email,
      //     username: $scope.username,
      //     password: $scope.password
      //   }
      // }).then((response) => {
      //   // console.log('After signup success: ', response)
      //   location.href = '/'
      // }, (errorResponse) => {
      //   // console.log('After signup error: ', errorResponse)
      //   $scope.error = errorResponse.data.message
      // })
    }

    $scope.signin = () => {
      // console.log('Signin function')
      $cookies.put('email', $scope.email)// 쿠키에 저장 
      document.getElementsByTagName('form')[0].submit()
    }

    // 사용자 리스트 불러오기
    $scope.find = () => {
      $http({
        method: 'GET',
        url: '/api/users'
      }).then((response) => {
        // console.log('After find users: ', response)
        $scope.users = response.data
      }, (errorResponse) => {
        // console.log('After find users(error): ', errorResponse)
        $scope.error = errorResponse.data.message
      })
    }

    // filter function
    $scope.rank = (user) => -$scope.average(user.scores.total, user.scores.count)
    $scope.average = (total, count) => count ? (total / count) : 0;

  }
])
