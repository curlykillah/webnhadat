myApp.controller('contactController', function ($scope, $http) {
    console.log('work;');
    $scope.price=0;
    $scope.checkBank = false;
    $scope.check = function (gia) {
        $scope.price=2000;
    }
    $scope.checkBank = function () {
        return false;
    }
    $scope.submitted = false;
    $scope.form = [];
    $scope.useremail = 'unset';
    $scope.submit = function (form) {

        $http({
            url: "server/forgotpass.server.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "email=" + form.email + "&status=check"
        }).then(function (response) {

            if (response.data.status == "success") {
                $('#emailAlert').removeClass('alert alert-danger');
                $('#emailAlert').addClass('alert alert-success');
                $scope.success = "Thành Công:"
                $scope.thongBao = "Vui lòng bấm gửi";
                $scope.useremail = response.data.email;
            } else {
                $('#emailAlert').addClass('alert alert-danger');
                $('#emailAlert').removeClass('alert alert-success');
                $scope.success = "Thất bại:"
                $scope.thongBao = "Không có tài khoản được đăng kí bới Email này";
            }

        });
    };

    $scope.send = function (form) {
        $scope.text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 10; i++)
            $scope.text += possible.charAt(Math.floor(Math.random() * possible.length));

        if (form.email == $scope.useremail) {
            form.name = "Cưng";
            $scope.submitted = true;
            form.question = "Mật Khẩu";
            form.newpass = $scope.text;
            $http({
                url: "server/forgotpass.server.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "email=" + form.email + "&newpassword=" + $scope.text + "&status=changePass"
            }).then(function (response) {

                if (response.data.status == "success") {
                    $('#emailAlert').addClass('alert alert-success');
                    $scope.success = "Gửi Thành Công:"
                    $scope.thongBao = "Đã gửi thông tin vào email của bạn"
                } else {
                    $('#emailAlert').addClass('alert alert-danger');
                    $scope.success = "Thất Bại:"
                    $scope.thongBao = "Vui lòng kiểm tra lại tên đăng nhập";
                }
            });
        } else {
            alert('Kiểm Tra trước khi gửi đi');
        }
    }
    // if(submitted){alert('Gửi thành công!');}
    // $scope.upload=function(){
    //     if($scope.submitted=true){
    //         alert('Gửi thành công!');}
    //     else{
    //         alert('Gửi thất bại!');
    //     }
    // }
})