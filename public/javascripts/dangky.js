// var app = angular.module('cinema', []);
// app.controller('dangkyController', function($scope, $http) {
//     $scope.user = {}
//     $scope.taoPhim=()=>{
//         if(!taoKhongThanhCong($scope.movie.tenPhim, $scope.movie.theLoai, $scope.movie.thoiGianTao)) {
//             $http.post('/api/v1/movie/', $scope.movie).then(function (res){
//                 window.alert('Tạo Phim Thành Công')
//                 setTimeout(() => {
//                     window.location.href='/home'
//                 }, 100);
//             })
//         }
//     }
//   });

//   function taoKhongThanhCong(tenPhim, theLoai, thoiGianTao) {
//     let check = false
//     if (!tenPhim) {
//         check = true
//         alert('Tên phim chưa nhập')
//     }
//     // Thông báo 1 dòng
//     // else (.....)
//     // if (.....) 
//     else if (!theLoai) {
//         check = true
//         alert('Nhập thể loại')
//     }
//     else if (!thoiGianTao) {
//         check = true
//         alert('Nhập thời gian tạo')
//     }
//     return check
//   }