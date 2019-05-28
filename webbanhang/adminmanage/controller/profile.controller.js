myAdmin.controller('profileController', function ( $scope, $http,user) {
    if (!user.isUserLoggedIn() || user.getName()!="admin") {
        location.replace('login.html');
    } else {
        $scope.image='images/atomix_user31.png';
        $scope.user = {};
        $scope.userprofile = {};
        $http({
            url: "server/poster.server.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "username=" +  user.getName() + "&state=" + "profile"
        }).then(function (response) {
            for (let e of response.data) {
                $scope.userprofile.id = e['ID'];
                $scope.userprofile.name = e['username'];
                $scope.userprofile.password = e['password'];
                $scope.userprofile.authority = e['authority'];
                if(e['authority']=='admin')
                $scope.image = "images/chat-avatar2.png";
            };
            $scope.user = $scope.userprofile;

            if (!$scope.user.id) {
                $scope.id = 0;
            }
        });
        $scope.add = function (users) {
                    users.password = users.newpassword;
                    var data = $.param(users);
                    $http({
                        url: "server/poster.service.php",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: data + "&state=" + 'profile'
                    }).then(function (response) {
                        alert("Sửa thành công");
                    });
        }
    }

})