var app = angular.module('cinema', []);
app.controller('homeController', function ($scope, $http) {

    $http.get('/api/v1/movie/', $scope.movie).then(function (res) {
        $scope.movies = res.data.ListMovie
        $scope.username = getCookie('username')
    })


    $scope.user = {}
    $scope.dangKy = () => {
        if (!dangKyKhongThanhCong($scope.user.tenDangNhap, $scope.user.matKhau, $scope.user.xacNhanMatKhau, $scope.user.email)) {
            $http.post('/api/v1/user/', $scope.user).then(function (res) {
                window.alert(res.data.errorMessage || 'Đăng ký thành công')
                if (!res.data.errorMessage) {
                    setCookie('username', res.data.user.tenNguoiSuDung)
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 100);
                }
            }).catch(function (res) {
                console.log(res)
            })
        }
    }

    $scope.user = {}
    $scope.dangNhap = () => {
        if (!dangNhapKhongThanhCong($scope.user.email, $scope.user.matKhau)) {
            $http.post('/api/v1/user/dang-nhap', $scope.user).then(function (res) {
                if (res.data.errorMessage) {
                    window.alert(res.data.errorMessage)
                } else {
                    setCookie('username', res.data.user.tenNguoiSuDung)
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 100);
                }
            }).catch(function (res) {
                console.log(res)
            })
        }
    }

    $scope.dangXuat = () => {
        if (confirm('Bạn có chắc có đăng xuất hay không?')) {
            $http.get('/api/v1/user/dang-xuat', $scope.user).then(function (res) {
                deleteCookie('username')
                setTimeout(() => {
                    window.location.href = '/'
                }, 100);
            })
        } else {
            // Do nothing!
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



