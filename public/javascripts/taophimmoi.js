var app = angular.module('cinema', []);
app.controller('taophimmoiController', function($scope, $http) {
    $scope.movie = {}
    $scope.taoPhim=()=>{

        $http.post('/api/v1/movie/', $scope.movie).then(function (res){
            window.alert('Tạo Phim Thành Công')
            setTimeout(() => {
                window.location.href='/home'
            }, 1000);
        })
    }
  });