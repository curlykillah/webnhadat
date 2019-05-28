myAdmin.controller('categoryController', function ($scope, $http, $location,user) {
    console.log(new Date());
    if (!user.isUserLoggedIn()) {
        location.replace('login.html');
    }else {
        $scope.allCate = [];
        $http({
            url: "server/cate.server.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "status=all"
        }).then(function (response) {

            for (let e of response.data) {
                $scope.allCate.push({
                    id: e['id'],
                    keyword: e['cate_keyword'],
                    name: e['cate_name'],
                    piority: e['cate_piority']
                });
            };
        });
        $scope.cateAddbtn = function (id) {
            $location.path('/admin/category/' + id);
        };
        $scope.cateConfirmDelete = function (cate) {
            var isConfirmDelete = confirm('Bạn có chắc muốn xóa dòng dữ liệu này???');
            if (isConfirmDelete == true) {
                $http({
                    url: "server/cate.server.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: "status=delete" + "&id=" + cate.id
                }).then(function (response) {
                    var index = $scope.allCate.indexOf(cate);
                    $scope.allCate.splice(index, 1);
                    $http({
                        url: "server/adminmanage.server.php",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: 'postername='+user.getName()+"&date="+(new Date()).toUTCString()+"&content="+cate.name+"&cate=category"+"&action="+'delete' + "&status=" + 'add'
                    }).then(function(response){
                        location.reload();
                    })
                })
            }
        }
    }

})