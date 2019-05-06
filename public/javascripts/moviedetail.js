var app = angular.module('cinema', []);
var formData = new FormData()

app.controller('moviedetailController', function ($scope, $http) {
    $scope.movie = {}
    $scope.username = getCookie('username')

    var id = $('#id').text()

    $http.get('/api/v1/movie/'+id).then(function (res) {
       $scope.movie = res.data.movie
       $scope.dataTemp = JSON.parse(JSON.stringify($scope.movie)) 

    }).catch(function(res){
        window.alert(res.data.errorMessage)
    })

    $(document).ready(function () {
        $('#date').datepicker('setDate', new Date($scope.movie.thoiGianPhatHanh));
    });



    $scope.huy = () => {
        $scope.movie = $scope.dataTemp
    }

    $scope.luu = async () => {
        let hinh = formData.get('hinh')
        if (!luuKhongThanhCong($scope.movie.tenPhim, $scope.movie.theLoai, $scope.movie.thoiGianPhatHanh)) {
            if (hinh) {
                $scope.uploadHinh()
            } else {
                $scope.movie.thoiGianPhatHanh = $("#date").datepicker('getDate').getTime();
                $http.put('/api/v1/movie/'+id, $scope.movie).then(function (res) {
                    setTimeout(() => {
                    $scope.isEdit = false
                    window.location.reload()
                    }, 100);
                })
            }
        }
    } 

    $scope.xoa = () => {
        if (confirm('Bạn có chắc có xoá phim hay không?')) {
            $http.delete('/api/v1/movie/'+id).then(function (res) {
                setTimeout(() => {
                    window.location.href = '/'
                }, 100)
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
                $http.put('/api/v1/movie/'+id, $scope.movie).then(function (res) {
                    setTimeout(() => {
                    $scope.isEdit = false
                    window.location.reload()
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



function luuKhongThanhCong(tenPhim, theLoai) {
    let check = false
    if (!tenPhim) {
        check = true
        alert('Vui lòng nhập tên phim')
    }
    else if (!theLoai) {
        check = true
        alert('Vui lòng nhập thể loại')
    }

    return check
}



function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
}