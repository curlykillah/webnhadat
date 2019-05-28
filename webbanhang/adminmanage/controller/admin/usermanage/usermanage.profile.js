myAdmin.controller('usermanageController', function ($routeParams, $http, $scope,user) {
    if (!user.isUserLoggedIn() || user.getName()!="admin") {
        location.replace('login.html');
    } else {
        $scope.user = {};
        $scope.userprofile = {};
        $http({
            url: "server/user.profile.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "userid=" + $routeParams.childs
        }).then(function (response) {
            $scope.userprofile.id = response.data[0].id;
            $scope.userprofile.name = response.data[0].name;
            $scope.userprofile.password = response.data[0].password;
            $scope.userprofile.email = response.data[0].email;
            $scope.userprofile.image = response.data[0].image;
            $scope.userprofile.vip = response.data[0].vip;

            $scope.user = $scope.userprofile;

        });
        $scope.add = function (users) {
            if (!users.newpassword || users.newpassword=='') {
                $scope.action='edit';
                var data = $.param(users);
                $http({
                    url: "server/user.service.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: data + "&state=" + 'edit'
                }).then(function (response) {

                    alert("edit thanh cong");
                });
            } else {
                $scope.action='changePass';
                users.password = users.newpassword;

                var data = $.param(users);

                $http({
                    url: "server/user.service.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: data + "&state=" + 'changePass'
                }).then(function (response) {

                    alert("edit thanh cong");
                });
            }
            $http({
                url: "server/adminmanage.server.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: 'postername='+user.getName()+"&date="+(new Date()).toUTCString()+"&content="+users.name+"&cate=user" +"&action="+$scope.action + "&status=" + 'add'
            }).then(function(response){
                location.reload();
            })
        }
    }

})