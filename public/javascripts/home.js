var app = angular.module('cinema', []);

app.controller('homeController', function($scope, $http) {
  
        $http.get('/api/v1/movie/', $scope.movie).then(function (res){
            $scope.movies = res.data.ListMovie
        })
    
  });





