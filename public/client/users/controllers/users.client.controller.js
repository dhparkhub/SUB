
angular.module('users').controller('UsersController', [
  '$scope', '$http', '$routeParams', '$location', 'Authentication', 'Scores', ($scope, $http, $routeParams, $location, Authentication, Scores) => {

    $scope.user = Authentication
    $scope.scores = []
    $scope.score = ''
    $scope.total = $scope.user ? $scope.user.scores.total : 0
    $scope.count = $scope.user ? $scope.user.scores.count : 0
    $scope.userId = $routeParams.userId

    // 자기 자신의 정보로 들어오면 users 페이지로 이동시킨다
    if ($scope.user && $scope.user._id == $routeParams.userId) {
      $location.path('users')
    }

    // 임의의 사용자가 다른 사용자의 정보를 보는 경우 
    if ($routeParams.userId && (!$scope.user || $scope.user._id != $routeParams.userId)) {
      $http({
        method: 'GET',
        url: '/api/users/' + $routeParams.userId
      }).then((response) => {
        // console.log('After find user: ', response)
        $scope.total = response.data.scores.total
        $scope.count = response.data.scores.count
      }, (errorResponse) => {
        // console.log('After find user(error): ', errorResponse)
        $scope.error = errorResponse.data.message
      })
    }

    $scope.find = () => {
      Scores.query({
        mode: 1,// Private mode
        user: $routeParams.userId
      }, (response) => {
        // console.log('After finding scores: ', response)
        $scope.scores = response
        $scope.scores.total = 0
        $scope.scores.forEach((element) => {
          $scope.scores.total += element.score
        })
      }, (errorResponse) => {
        // console.log('After finding scores(error): ', errorResponse)
        $scope.error = errorResponse.data.message
      })
    }

    $scope.create = () => {
      const score = new Scores({ score: $scope.score })
      $scope.score = ''
      score.$save((response) => {
        // console.log('After registering scores: ', response)
        $scope.total += response.score
        $scope.count++
        $scope.scores.total += response.score
        $scope.scores.unshift(response)
      }, (errorResponse) => {
        // console.log('After registering scores(error): ', errorResponse)
        $scope.error = errorResponse.data.message
      })
    }

    $scope.delete = (score) => {
      console.log(score);
      if(confirm('Do you really want to delete this score?')) {
        score.$remove({
          scoreId: score._id
         }, () => {
          for(let i in $scope.scores){
            if($scope.scores[i] === score){
              $scope.scores.splice(i, 1)
            }
          }
          $scope.count--
          $scope.total -= score.score
          $scope.scores.total -= score.score
        })
      }
    }

  }
])
