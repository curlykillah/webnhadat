myAdmin.controller('categoryEditController', function ($routeParams, $scope, $http,user) {
    if (!user.isUserLoggedIn()) {
        location.replace('login.html');
    } else {

        $scope.cate = {};
        $scope.cateprofile = {};
        $scope.id = $routeParams.childs;
        $http({
            url: "server/cate.server.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "id=" + $scope.id + "&status=search"
        }).then(function (response) {
            for (let e of response.data) {
                $scope.cateprofile.id = e['id'];
                $scope.cateprofile.keyword = e['cate_keyword'];
                $scope.cateprofile.name = e['cate_name'];
                $scope.cateprofile.piority = e['cate_piority'];
            };
            $scope.cate = $scope.cateprofile;
            if (!$scope.cate.id) {
                $scope.id = 0;
            }
        })
        $scope.add = function (cate, id) {
            if (id == 0) {
                $scope.action='add';
                var data = $.param(cate);
                $http({
                    url: "server/cate.server.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: data + "&status=" + 'add'
                }).then(function (response) {
                    alert("add thanh cong");
                });
            } else {
                $scope.action='edit';
                var data = $.param(cate);
                $http({
                    url: "server/cate.server.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: data + "&status=" + 'edit'
                }).then(function (response) {
                    alert("edit thanh cong");
                });
            };
            $http({
                url: "server/adminmanage.server.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: 'postername='+user.getName()+"&date="+(new Date()).toUTCString()+"&content="+cate.name+"&cate=category"+"&action="+$scope.action + "&status=" + 'add'
            }).then(function(response){
                location.reload();
            })
        }
    }

})