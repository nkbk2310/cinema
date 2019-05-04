var app = angular.module('cinema', []);
app.controller('signinController', function ($scope, $http) {
    $scope.movies = {}
    $scope.username = getCookie('username')

    $scope.user = {}
    $scope.dangNhap = () => {
        if (!dangNhapKhongThanhCong($scope.user.email, $scope.user.matKhau)) {
            $http.post('/api/v1/user/dang-nhap', $scope.user).then(function (res) {
                    setCookie('username', res.data.user.tenNguoiSuDung)
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 100);
            }).catch(function (res) {
                window.alert(res.data.errorMessage)
                console.log(res)
            })
        }
    }
});



function dangNhapKhongThanhCong(email, matKhau) {
    let check = false
    if (!email) {
        check = true
        alert('Chưa nhập email')
    }
    if (!matKhau) {
        check = true
        alert('Chưa nhập mật khẩu')
    }
    return check
}

function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
}