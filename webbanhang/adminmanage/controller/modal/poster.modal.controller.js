myAdmin.controller('posterModalController',function($scope,$http){
    $scope.allUser = [];
    $http({
        url: "server/poster.server.php",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "delete=" + 1 +"&state="+"all"
    }).then(function (response) {

        for (let e of response.data) {
            $scope.allUser.push({
                id: e['ID'],
                name: e['name'],
                authority: e['authority'],
            });
        };

    });
    $scope.active=function(id,user){

        var isConfirmDelete = confirm('Bạn có chắc muốn xóa dòng dữ liệu này???');
        data
        if (isConfirmDelete == true) {
            var data = $.param(user);
            $http({
                url: "server/poster.service.php",
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