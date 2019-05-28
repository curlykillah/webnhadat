myAdmin.controller('posterAddController', function ($routeParams, $scope, $http,user) {
    if (!user.isUserLoggedIn() || user.getName()!="admin") {
        location.replace('login.html');
    } else {
        $scope.image='images/atomix_user31.png';

        $scope.id = $routeParams.childs;
        $scope.user = {};
        $scope.userprofile = {};
        $http({
            url: "server/poster.server.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "userid=" + $scope.id + "&state=" + "id"
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
        $scope.add = function (users, id) {
            if (id == 0) {
                $scope.action='add';
                users.password = users.newpassword;
                var data = $.param(users);

                $http({
                    url: "server/poster.service.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: data + "&state=" + 'add'
                }).then(function (response) {

                    alert("add thanh cong");

                });
            } else {
                if (!users.newpassword || users.newpassword=='') {
                    $scope.action='edit';
                    var data = $.param(users);

                    $http({
                        url: "server/poster.service.php",
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
                        url: "server/poster.service.php",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: data + "&state=" + 'changePass'
                    }).then(function (response) {

                        alert("edit thanh cong");
  
                    });
                }
            }
            $http({
                url: "server/adminmanage.server.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: 'postername='+user.getName()+"&date="+(new Date()).toUTCString()+"&content="+users.name +"&cate=poster"+"&action="+$scope.action + "&status=" + 'add'
            }).then(function(response){
                location.reload();
            })

        }
    }

})