
angular.module('main').controller('MainController', [
  '$scope', '$http', '$cookies', 'Authentication', ($scope, $http, $cookies, Authentication) => {

    $scope.user = Authentication
    $scope.users = []
    $scope.scores = []
    $scope.ranks = {}
    $scope.email = $cookies.get('email')

    // 회원가입
    $scope.signup = () => {
      // alert('테스트 하지마라, 신재용!')
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

    $scope.signin = () => {
      // console.log('Signin function')
      $cookies.put('email', $scope.email)// 쿠키에 저장
      document.getElementsByTagName('form')[0].submit()
    }

    // 사용자 리스트 불러오기
    $scope.find = () => {
      $http({
        method: 'GET',
        url: '/api/main'
      }).then((response) => {
        // console.log('After find users: ', response)
        $scope.users = response.data
      }, (errorResponse) => {
        // console.log('After find users(error): ', errorResponse)
        $scope.error = errorResponse.data.message
      })

      // ranks
      $http({
        method: 'GET',
        url: '/api/scores'
      }).then((response) => {
        console.log('After find scores: ', response)
        $scope.scores = response.data

        const today = new Date()
        const quarters = []
        for (let i=0; i<4; i++) {
          quarters.push(new Date(today.getFullYear(), i*3, 1))
        }

        const ranks = $scope.ranks
        for (let score of $scope.scores) {
          const player = score.player

          if (!ranks[player._id]) {
            ranks[player._id] = {}
            ranks[player._id].username = player.username
            ranks[player._id].scores = new Array(4)
            // for (let playerScore of $scope.ranks[player._id].scores) {
            //   playerScore = {}
            //   playerScore.total = 0
            //   playerScore.count = 0
            // }
          }

          for (let i=0; i<quarters.length; i++) {
            if (new Date(score.created) < quarters[i]) {
              if (!ranks[player._id].scores[i]) {
                ranks[player._id].scores[i] = {}
                ranks[player._id].scores[i].total = score.score
                ranks[player._id].scores[i].count = 1
              } else {
                ranks[player._id].scores[i].total += score.score
                ranks[player._id].scores[i].count += 1
              }
              break;
            }
          }
        }

        console.log($scope.ranks)

      }, (errorResponse) => {
        console.log('After find users(error): ', errorResponse)
        $scope.error = errorResponse.data.message
      })
    }

  }
])
