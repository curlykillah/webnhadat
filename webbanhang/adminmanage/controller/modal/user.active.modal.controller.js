myAdmin.controller('userActiveModalController',function($scope,$http){

    $scope.allUser = [];
    $http({
        url: "server/user.server.php",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "delete=" + 0+"&active=" + 0
    }).then(function (response) {

        for (let e of response.data) {
            $scope.allUser.push({
                id: e['id'],
                name: e['name'],
                password: e['password'],
                email: e['email'],
                vip: e['vip'],
                image: e['image']
            });
        };

    });
    $scope.active=function(id,user){
        var isConfirmDelete = confirm('Active người dùng này???');
        if (isConfirmDelete == true) {
            var data = $.param(user);
            $http({
                url: "server/user.service.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data + "&state=" + 'active'
            }).then(function (response) {
                location.reload();

            });
        } else {
            return false;
        }
    }
})