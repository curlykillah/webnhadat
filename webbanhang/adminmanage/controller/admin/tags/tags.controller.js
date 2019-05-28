myAdmin.controller('tagsController', function ($scope, $http,user) {
    if (!user.isUserLoggedIn()) {
        location.replace('login.html');
    }else{
        $scope.allTags = [];
        $http({
            url: "server/tags.server.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "status=all"
        }).then(function (response) {
            for (let e of response.data) {
                $scope.allTags.push({
                    id: e['tag_id'],
                    name: e['tag_name']
                });
            };
        });
        $scope.tagsConfirmDelete = function (tag) {
            var isConfirmDelete = confirm('Bạn có chắc muốn xóa dòng dữ liệu này???');
            if (isConfirmDelete == true) {
                $http({
                    url: "server/tags.server.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: "status=delete" + "&id=" + tag.id
                }).then(function (response) {
                    var index = $scope.allTags.indexOf(tag);
                    $scope.allTags.splice(index, 1);
                })
            }
        }
    }
    

})