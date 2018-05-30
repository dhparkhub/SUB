
angular.module('scores').controller('ScoresController', [
  '$scope', '$http', 'Authentication', 'Scores', ($scope, $http, Authentication, Scores) => {

    $scope.user = Authentication
    $scope.scores = []
    $scope.score = ''

    $scope.find = () => {
      Scores.query({
        mode: 1// Private mode
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
        $scope.user.scores.total += response.score
        $scope.user.scores.count++
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
          $scope.user.scores.count--
          $scope.user.scores.total -= score.score
          $scope.scores.total -= score.score
        })
      }
    }

  }
])
