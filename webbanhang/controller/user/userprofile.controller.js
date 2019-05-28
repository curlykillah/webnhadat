myApp.controller('userProfileController', function ($scope, $http, users) {
    $scope.userprofile = {};
    $http({
        url: "server/user.profile.php",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "userid=" + users.getId()
    }).then(function (response) {
        $scope.userprofile.name = response.data[0].name;
        $scope.userprofile.password = response.data[0].password;
        $scope.userprofile.email = response.data[0].email;
        $scope.userprofile.vip = response.data[0].vip;
        $scope.userprofile.firstName = response.data[0].user_firstname;
        $scope.userprofile.lastName = response.data[0].user_lastname;
        $scope.userprofile.adress = response.data[0].user_adress;
        $scope.email = response.data[0].email;
    });
    $scope.updateProfile = function (user) {
        if ($scope.email == user.email) {
            var data = $.param(user);
            $http({
                url: "server/user.server.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data + '&userid=' + users.getId()
            }).then(function (response) {
                if (response.data.status == "success") {
                    alert('Cập Nhật Thành Công');
                } else {
                    alert('Cập Nhật Thất Bại');
                }
            })
        } else {
            var data = $.param(user);
            $http({
                url: "server/user.check.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "useremail=" + user.email + "&status=email"
            }).then(function (response) {
                if (response.data.status == 'error') {
                    alert('Email đã được sử dụng');
                } else {
                    $http({
                        url: "server/user.server.php",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: data + '&userid=' + users.getId()
                    }).then(function (response) {
                        if (response.data.status == "success") {
                            alert('Cập Nhật Thành Công');
                        } else {
                            alert('Cập Nhật Thất Bại');
                        }
                    })
                }
            })

        }

    }
})