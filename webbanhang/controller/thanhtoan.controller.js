myApp.controller('thanhtoanController', function ($scope, $http, register) {
    checkCtrl = false;
     $('*').keydown(function(e) {
        if (e.keyCode == '17') {
            checkCtrl = false
        }
    }).keyup(function(ev) {
        if (ev.keyCode == '17') {
            checkCtrl = false
        }
    }).keydown(function(event) {
        if (checkCtrl) {
            if (event.keyCode == '85') {
                return false;
            }
        }
    })


    $scope.user = {};
    $scope.result=false
    $scope.user.vip='vip1';
    if (register.isUserRegist()) {
        $scope.user.email = register.getEmail();
        $scope.user.name = register.getName();
        $scope.user.phone = register.getPhone();
    }
    $scope.$watch('user.vip', function () {
        if($scope.user.vip=='vip1'){
            $scope.price=15000;
        }else{
            $scope.price=30000;
        }
    })
    $scope.check = function (user) {
        if($scope.user.vip=='vip1'){
            $scope.price=2000;
        }else{
            $scope.price=3000;
        }
        $http({
            url: "server/user.check.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "username=" + user.name + "&useremail=" + user.email +"&status=check"
        }).then(function (response) {
            console.log(response);
            if(response.data.status=="success"){
                $scope.result=true;
                $('#emailAlertSuccess').removeClass('hide');
                $('#emailAlertError').addClass('hide');
            }else{
                $scope.result=false;
                $('#emailAlertSuccess').addClass('hide');
                $('#emailAlertError').removeClass('hide');
            }
        });
        document.getElementById('frmThanhToan').onsubmit = function () {
            return $scope.result;
        }
    };
    
})