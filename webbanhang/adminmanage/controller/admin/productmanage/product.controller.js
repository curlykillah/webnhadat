myAdmin.controller('productManageController', function ($scope, $http, $location,user) {

    if (!user.isUserLoggedIn()) {
        location.replace('login.html');
    } else {
        $scope.pages = [];
        $scope.key='';
        $scope.itemsPerPage = 5;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.search=function(keyword){
            $scope.key=keyword;
            $scope.currentPage = 1;
        }
        $scope.$watch('currentPage + itemsPerPage + key', function () {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            $scope.pages = [];
            if($scope.key!=''){
                $http({
                    url: "server/pagni.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: "begin=" + begin + "&end=" + $scope.itemsPerPage + "&status=search"+"&key="+$scope.key
                }).then(function (response) {
                    $scope.totalItems = response.data['count'];
                    for (let e of response.data['state']) {
                        $scope.pages.push({
                            id: e['id'],
                            name: e['product_name'],
                            category: e['product_category'],
                            author: e['product_author'],
                            image: e['product_img'],
                        });
                    };
                });
            }else{
                $http({
                    url: "server/pagni.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: "begin=" + begin + "&end=" + $scope.itemsPerPage + "&status=home"
                }).then(function (response) {
                    $scope.totalItems = response.data['count'];
                    for (let e of response.data['state']) {
                        $scope.pages.push({
                            id: e['id'],
                            name: e['product_name'],
                            category: e['product_category'],
                            author: e['product_author'],
                            image: e['product_img'],
                        });
                    };
                });
            }
            
        })
        $scope.productAddbtn = function (id) {
            console.log('work');
            $location.path('/admin/product/' + id);
        };

        $scope.productConfirmDelete = function (id, page) {
            var isConfirmDelete = confirm('Bạn có chắc muốn xóa dòng dữ liệu này???');
            if (isConfirmDelete == true) {
                var data = $.param(page);
                $http({
                    url: "server/service.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: data + "&state=" + 'delete'
                }).then(function (response) {
                    console.log(response.data);
                    var index = $scope.pages.indexOf(page);
                    $scope.pages.splice(index, 1);
                    $http({
                        url: "server/adminmanage.server.php",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: 'postername='+user.getName()+"&date="+(new Date()).toUTCString()+"&content="+page.name+"&cate=product"+"&action="+'delete' + "&status=" + 'add'
                    }).then(function(response){
                        location.reload();
                    })
                });
            } else {
                return false;
            }
        };
    }

})