(function(){
  angular.module('reddit', ['angularMoment', 'ngAnimate'])
    .controller('mainCTRL', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
      $scope.articles = []
      $scope.article = {}
      $scope.title = 'Reddit Clone'
      $scope.is_active = false
      moment.locale('en', {
        calendar : {
            lastDay : '[Yesterday at] LT',
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            lastWeek : '[Last] dddd [at] LT',
            nextWeek : 'dddd [at] LT',
            sameElse : 'L'
        }
      })

      $http.get('https://young-atoll-3836.herokuapp.com/api/post')
      .then(function(response){
        $scope.articles = response.data
      }, function(data, status){
        console.log(data, status)
      })

      $scope.addArticle = function(){
        $scope.article.comment = []
        $scope.article.date = new Date()
        $scope.article.rating = 0
        console.log($scope.article)
        $http.post('https://young-atoll-3836.herokuapp.com/api/post', $scope.article)
        .then(function(response){
          $scope.articles.push(response.data)
          $scope.article = {}
        }, function(data, status){
          console.log(data, status)
        })
      }

      $scope.update = function(id, user, comment){
        $scope.articles.map(function(value){
          if (value._id == id) {
            value.comment.push({username : user, text : comment})
          }
        })
        $http.put('https://young-atoll-3836.herokuapp.com/api/post/comment/' + id, {username : user, text : comment})
        .then(function(response){
          console.log(response)
        }, function(data, status){
          console.log(data, status)
        })
      }

      $scope.update_rating = function(id, number){
        $http.put('https://young-atoll-3836.herokuapp.com/api/post/rating/' + id, {rating : number})
        .then(function(response){
          console.log(response)
        }, function(data, status){
          console.log(data, status)
        })
      }

      $scope.update_color = function (rating){
        if (rating === 0) {
          return 'black'
        } else if (rating > 0 ) {
          return '#00cc00'
        } else {
          return 'red'
        }
      }

      $scope.save = function(id){
        console.log('hello' + id)
      }
    }])
})()
