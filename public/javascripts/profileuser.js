var app = angular.module('cinema', []);
var formData = new FormData()

app.controller('userController', function ($scope, $http) {
    $scope.user = {}
    $scope.username = getCookie('username')

    var email = $('#email').text()

    $http.get('/api/v1/user/'+email).then(function (res) {
       $scope.user = res.data.user
       $scope.dataTemp = JSON.parse(JSON.stringify($scope.user))

    }).catch(function(res){
        window.alert(res.data.errorMessage)
    })

    $scope.huy = () => {
        $scope.user = $scope.dataTemp
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
                $scope.user.hinhDaiDien = res.fileName
                $http.put('/api/v1/user/'+email, $scope.user).then(function (res) {
                    setTimeout(() => {
                    $scope.isEdit = false
                    window.location.reload()
                    }, 100);
                })
            }
        });
    }

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

    $scope.luu = async () => {
        let hinh = formData.get('hinh')
        if (!luuKhongThanhCong($scope.user.tenNguoiSuDung, $scope.user.email)) {
            if (hinh) {
                $scope.uploadHinh()
            } else {
                $http.put('/api/v1/user/'+email, $scope.user).then(function (res) {
                    setCookie('username', res.data.user.tenNguoiSuDung)
                    setTimeout(() => {
                    $scope.isEdit = false
                    window.location.reload()
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
        }
    }
})

function luuKhongThanhCong(tenNguoiSuDung, email) {
    let check = false
    if (!tenNguoiSuDung) {
        check = true
        alert('Chưa nhập tên đăng nhập')
    }
    else if (!email) {
        check = true
        alert('Chưa nhập email')
    }
}

function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
}