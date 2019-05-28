myAdmin.controller('posterManageController', function ($scope, $http, $location, $uibModal,user) {
    if (!user.isUserLoggedIn() || user.getName()!="admin") {
        location.replace('login.html');
    } else {
        $scope.allUser = [];
        $scope.itemsPerPage = 5;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.$watch('currentPage + itemsPerPage', function () {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            $scope.allUser = [];
            $http({
                url: "server/pagni2.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "begin=" + begin + "&end=" + $scope.itemsPerPage + "&delete=" + 0
            }).then(function (response) {
                $scope.totalItems = response.data['count'];
                for (let e of response.data['state']) {
                    var image='';
                    switch (e['authority']) {
                        case "admin":
                            image = "images/chat-avatar2.png";
                            break;
                        case "post":
                            image = "images/atomix_user31.png"
                            break;
                    };
                    $scope.allUser.push({
                        id: e['ID'],
                        name: e['username'],
                        password: e['password'],
                        authority: e['authority'],
                        image: image,
                    });
                };
            });
        })
        $scope.posterAddbtn = function (id) {
            $location.path('/admin/poster/' + id);
        };
        $scope.posterConfirmDelete = function (id, users) {

            var isConfirmDelete = confirm('Bạn có chắc muốn xóa dòng dữ liệu này???');
            if (isConfirmDelete == true) {
                var data = $.param(users);
                $http({
                    url: "server/poster.service.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: data + "&state=" + 'delete'
                }).then(function (response) {
                    var index = $scope.allUser.indexOf(users);
                    $scope.allUser.splice(index, 1);
                    $http({
                        url: "server/adminmanage.server.php",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: 'postername='+user.getName()+"&date="+(new Date()).toUTCString()+"&content="+users.name +"&cate=poster"+"&action="+'delete' + "&status=" + 'add'
                    }).then(function(response){
                        location.reload();
                    })
                });
            } else {
                return false;
            }
        };

        $scope.animationsEnabled = true;
        $scope.modalUpload = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                //   ariaLabelledBy: 'modal-title',
                //   ariaDescribedBy: 'modal-body',
                templateUrl: 'template/modal/postermymodal.html',
                controller: 'posterModalController',
                //   controllerAs: '$ctrl',
                size: "lg",
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {

                if (!$scope.product.content) {
                    $scope.product.content = selectedItem;
                } else
                    $scope.product.content = $scope.product.content + selectedItem;

                // $ctrl.selected = selectedItem;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

    }

})