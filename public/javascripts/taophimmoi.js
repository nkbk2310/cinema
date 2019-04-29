var app = angular.module('cinema', []);
app.controller('taophimmoiController', function($scope, $http) {
    $scope.movie = {}
    
    $scope.taoPhim=()=>{
        if(!taoKhongThanhCong($scope.movie.tenPhim, $scope.movie.theLoai, $scope.movie.thoiGianTao)) {
            $http.post('/api/v1/movie/', $scope.movie).then(function (res){
                window.alert('Tạo Phim Thành Công')
                setTimeout(() => {
                    window.location.href='/home'
                }, 100);
            })
        }
    }


    $scope.user = {}
    $scope.dangKy=()=>{
        if(!dangKyKhongThanhCong($scope.user.tenDangNhap, $scope.user.matKhau, $scope.user.xacNhanMatKhau, $scope.user.email)){
            $http.post('/api/v1/user/', $scope.user).then(function (res){
                window.alert('Đăng Ký Thành Công')
                setTimeout(() => {
                    window.location.href='/taophimmoi'
                }, 100);

            })
        }    
    }

    $scope.user = {}
    $scope.dangNhap=()=>{
        if(!dangNhapKhongThanhCong($scope.user.email, $scope.user.matKhau, $scope.user.xacNhanMatKhau, $scope.user.email)){
            $http.post('/api/v1/user/', $scope.user).then(function (res){
                window.alert('Đăng Ký Thành Công')
                setTimeout(() => {
                    window.location.href='/taophimmoi'
                }, 100);

            })
        }    
    }
   
});

 

  function taoKhongThanhCong(tenPhim, theLoai, thoiGianTao) {
    let check = false
    if (!tenPhim) {
        check = true
        alert('Tên phim chưa nhập')
    }
    // Thông báo 1 dòng
    // else (.....)
    // if (.....) 
    else if (!theLoai) {
        check = true
        alert('Nhập thể loại')
    }
    else if (!thoiGianTao) {
        check = true
        alert('Nhập thời gian tạo')
    }
    return check
  }

  function dangKyKhongThanhCong(tenDangNhap, matKhau, xacNhanMatKhau, email) {
    let check = false
    if (!tenDangNhap) {
        check = true
        alert('Chưa nhập tên đăng nhập')
    }  
    if (!matKhau) {
        check = true
        alert('Chưa nhập mật khẩu')
    }  
    if (!xacNhanMatKhau) {
        check = true
        alert('Chưa nhập xác nhập mật khẩu')
    }  
    if (!email) {
        check = true
        alert('Chưa nhập email')
    } 
    if (matKhau !== xacNhanMatKhau) {
        check = true
        alert('Mật khẩu không trùng khớp')
    }
    return check
  }

  function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
    }