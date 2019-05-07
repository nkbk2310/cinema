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

    // $scope.chonHinh = () => {
    //     $('#hinhDuocChon').click()
    // }
    

function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
}