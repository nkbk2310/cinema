var app = angular.module('cinema', []);
app.controller('userController', function ($scope, $http) {

    $http.get('/api/v1/movie/', $scope.movie).then(function (res) {
        $scope.movies = res.data.ListMovie
        $scope.username = getCookie('username')
    })
})