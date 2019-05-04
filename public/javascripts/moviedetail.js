var app = angular.module('cinema', []);
var formData = new FormData()

app.controller('taophimmoiController', function ($scope, $http) {
    $scope.movie = {}
    $scope.username = getCookie('username')

    var id = $('#id').text()

    $http.get('/api/v1/movie/'+id).then(function (res) {
       $scope.movie = res.data.movie
    }).catch(function(res){
        window.alert(res.data.errorMessage)
    })



    $scope.taoPhim = async () => {
        let hinh = formData.get('hinh')

        if (!taoKhongThanhCong($scope.movie.tenPhim, $scope.movie.theLoai, $scope.movie.thoiGianPhatHanh)) {
            if (hinh) {
                $scope.uploadHinh()
            } else {
                $scope.movie.thoiGianPhatHanh = $("#date").datepicker('getDate').getTime();
                $http.post('/api/v1/movie/', $scope.movie).then(function (res) {
                    window.alert('Tạo Phim Thành Công')
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 100);
                })
            }

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

    $scope.chonHinh = () => {
        $('#hinhDuocChon').click()
    }

    $scope.uploadHinh = () => {
        $.ajax({
            url: '/api/v1/upload',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (res) {
                $scope.movie.hinhMinhHoa = res.fileName
                $scope.movie.thoiGianPhatHanh = $("#date").datepicker('getDate').getTime();
                $http.post('/api/v1/movie/', $scope.movie).then(function (res) {
                    window.alert('Tạo Phim Thành Công')
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 100);
                })
            }
        });
    }
});

// function doiHinh(hinh){
//     if(hinh && hinh.files[0]){
//         $('#hinhHienThi').attr('src', hinh.value)
//     }
//     console.log(hinh)
// }

$("#hinhDuocChon").change(function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#hinhHienThi').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
        formData.append('hinh', this.files[0])
    }
});



function taoKhongThanhCong(tenPhim, theLoai, thoiGianPhatHanh) {
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