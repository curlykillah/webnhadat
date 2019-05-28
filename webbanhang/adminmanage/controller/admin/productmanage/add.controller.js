myAdmin.controller('addController', function ($log, $scope, $http, $routeParams, $uibModal, user) {
    if (!user.isUserLoggedIn()) {
        location.replace('login.html');
    } else {
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
                    keyword: e['cate_keyword'],
                    name: e['cate_name'],
                });
            };
        });
        $("#frmFileUpload").dropzone({
            url: "/image"
        });
        $scope.animationsEnabled = true;
        $scope.modalUpload = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                //   ariaLabelledBy: 'modal-title',
                //   ariaDescribedBy: 'modal-body',
                templateUrl: 'template/modal/imagemymodal.html',
                controller: 'imageModalController',
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
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.options = {
            language: 'en',
            allowedContent: true,
            entities: false
        };

        $scope.id = $routeParams.childs;
        $scope.pages = {};
        $scope.tags = [];
        $http({
            url: "server/server.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "id= " + $scope.id + "&status=" + "id"
        }).then(function (response) {
            for (let e of response.data) {
                $scope.pages.id = e['id'];
                $scope.pages.name = e['product_name'];
                $scope.pages.category = e['product_category'];
                $scope.pages.content = e['product_content'];
                $scope.pages.author = e['product_author'];
                $scope.pages.file = e['product_img'];
                $scope.pages.isslide = e['product_isslide'];
                $scope.pages.mota = e['product_mota'];
                if (e['product_isslide'] == '') {
                    $scope.pages.isslide = 'hide';
                }
                if (e['tags'] != '') {
                    $scope.pages.tags = angular.fromJson(e['tags']);
                }
                
            };

            $scope.product = $scope.pages;
            if (!$scope.product.isslide) {
                $scope.product.isslide ='hide' ;
            }
            if (!$scope.product.file || $scope.product.file == '') {
                $scope.product.file = "10506738_10150004552801856_220367501106153455_o.jpg";
            }
            if (!$scope.pages.id) {
                $scope.id = 0;
            }
    
        });
        $http({
            url: "server/tags.server.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "status=" + "all"
        }).then(function (response) {

            for (let e of response.data)
                $scope.tags.push(e['tag_name']);
        });


        $scope.add = function (product, id) {
            for (let e of product.tags) {
                if (!$scope.tags.includes(e)) {
                    $http({
                        url: "server/tags.server.php",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: "status=" + "add" + "&name=" + e
                    });
                }
            }
            product.tags = angular.toJson(product.tags)
            var fd = new FormData();
            angular.forEach($scope.files, function (file) {
                fd.append('file', file);
            });
            $http({
                method: 'POST',
                url: 'server/upload.php',
                data: fd,
                transformRequest: angular.indentity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (response) {

                if (response.data.status == 'error') {
                    if (!product.file) {
                        // product.file = '';
                    }
                } else
                if (response.data.status == "error type" || response.data.status == "error size") {
                    alert("Lỗi :" + response.data.status);
                } else {
                    product.file = response.data.name;
                }
                if (id == 0) {
                    $scope.action='add';
                    var data = $.param(product);
                    $http({
                        url: "server/service.php",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: data + "&state=" + 'add' + "&id=" + ''
                    }).then(function (response) {
                        alert("add thanh cong");
                    });
                } else {
                    $scope.action='edit';
                    var data = $.param(product);
                    $http({
                        url: "server/service.php",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: data + "&state=" + 'edit'
                    }).then(function (response) {
                        alert("sua thanh cong");
                    });
                };
                $http({
                    url: "server/adminmanage.server.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: 'postername='+user.getName()+"&date="+(new Date()).toUTCString()+"&content="+product.name+"&cate=product"+"&action="+$scope.action + "&status=" + 'add'
                }).then(function(response){
                    location.reload();
                })

            });
        }
    }
})