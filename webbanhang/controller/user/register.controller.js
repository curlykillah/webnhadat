myApp.controller('userRegisterController', function ($scope, $http,$uibModalInstance,register,$location) {
    $scope.close=function(){
        $uibModalInstance.close();
    }
    $scope.add = function (user) {

        if (!user.name || !user.password || !user.email || !user.phone) {
            alert('Đề Nghị Nhập đủ dữ liệu');
        } else {
            $http({
                url: "server/user.check.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "username=" + user.name + "&useremail=" + user.email+"&status=all"
            }).then(function (response) {

                if (response.data.status == "error") {
                    if (response.data.useremail == 'error') {
                        $('#emailAlert').removeClass('hide');
                    } else {
                        $('#emailAlert').addClass('hide');
                    }
                    if (response.data.username == 'error') {
                        $('#userAlert').removeClass('hide');
                    } else {
                        $('#userAlert').addClass('hide');
                    }
                } else {
                    user.active = 0;
                    var data = $.param(user);
                    $http({
                        url: "server/user.register.php",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: data
                    }).then(function (response) {
                        register.saveData(user);
                        alert("Đăng Ký thành công");
                        location.reload();
                        $location.path("/thanhtoan");
                    });
                }
            });

        }
    }
    

})