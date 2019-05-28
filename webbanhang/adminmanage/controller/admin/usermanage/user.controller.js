myAdmin.controller('userManageController', function ($scope, $http, $location, $uibModal,user) {
    if (!user.isUserLoggedIn() || user.getName()!="admin") {
        location.replace('login.html');
    } else {
        $scope.allUser = [];
        $scope.itemsPerPage = 5;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.key='';
        $scope.search=function(keyword){
            $scope.key=keyword;
            $scope.currentPage = 1;
        }
        $scope.$watch('currentPage + itemsPerPage +key', function () {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            $scope.allUser = [];
            if($scope.key!=''){
                $http({
                    url: "server/pagni3.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: "begin=" + begin + "&end=" + $scope.itemsPerPage + "&delete=" + 0 +"&active=" + 1 +'&status=search'+'&key='+$scope.key
                }).then(function (response) {
                    $scope.totalItems = response.data['count'];
                    for (let e of response.data['state']) {
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
            }else{
                $http({
                    url: "server/pagni3.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: "begin=" + begin + "&end=" + $scope.itemsPerPage + "&delete=" + 0 +"&active=" + 1 +'&status=all'
                }).then(function (response) {
                    $scope.totalItems = response.data['count'];
                    for (let e of response.data['state']) {
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
            }
            

        })
        $scope.userAddbtn = function (id) {

            $location.path('/admin/user/' + id);
        };

        $scope.userConfirmDelete = function (id, users) {
            var isConfirmDelete = confirm('Bạn có chắc muốn xóa dòng dữ liệu này???');
            if (isConfirmDelete == true) {
                var data = $.param(users);
                $http({
                    url: "server/user.service.php",
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
                        data: 'postername='+user.getName()+"&date="+(new Date()).toUTCString()+"&content="+users.name+"&cate=user" +"&action="+'delete' + "&status=" + 'add'
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
                templateUrl: 'template/modal/usermymodal.html',
                controller: 'userModalController',
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
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
        $scope.modalActive = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                //   ariaLabelledBy: 'modal-title',
                //   ariaDescribedBy: 'modal-body',
                templateUrl: 'template/modal/useractivemymodal.html',
                controller: 'userActiveModalController',
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
        $scope.excel = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'template/modal/exportexcelmodal.html',
                controller: 'userManageController',
                size: "lg",
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };
    }

})