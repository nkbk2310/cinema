var app = angular.module('cinema', []);
app.controller('signupController', function ($scope, $http) {
    $scope.movies = {}
    $scope.username = getCookie('username')

    $scope.user = {}
    $scope.dangKy = () => {
        if (!dangKyKhongThanhCong($scope.user.tenDangNhap, $scope.user.matKhau, $scope.user.xacNhanMatKhau, $scope.user.email)) {
            $http.post('/api/v1/user/', $scope.user).then(function (res) {
                // window.alert(res.data.errorMessage || 'Đăng ký thành công')
                if (!res.data.errorMessage) {
                    setCookie('username', res.data.user.tenNguoiSuDung)
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 100);
                } 
            }).catch(function (res) {
                console.log(res)
                window.alert(res.data.errorMessage)
            })
        }
    }
});

function dangKyKhongThanhCong(tenDangNhap, matKhau, xacNhanMatKhau, email) {
    let check = false
    if (!tenDangNhap) {
        check = true
        alert('Chưa nhập tên đăng nhập')
    }
    else if (!matKhau) {
        check = true
        alert('Chưa nhập mật khẩu')
    }
    else if (!xacNhanMatKhau) {
        check = true
        alert('Chưa nhập xác nhập mật khẩu')
    }
    else if (!email) {
        check = true
        alert('Chưa nhập email')
    }
    else if (matKhau !== xacNhanMatKhau) {
        check = true
        alert('Mật khẩu không trùng khớp')
    }
    return check
}

function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
}