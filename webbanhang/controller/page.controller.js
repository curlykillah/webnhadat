myApp.controller('pageController', function ($scope, $http, $routeParams, $location, users) {
    var loading = '<div class="overlay-content-property">\
                <img src="/Content/images/loading.gif" class="img-load" alt="loading..." />\
                <p>Đang tải...</p>\
            </div>';
    // $scope.ShowLoading=function() {
    //             $('#loadingWithOverlay').show();
    //         }
    // $scope.ShowLoading();
    // $scope.HideLoading=function() {
    //             $('#loadingWithOverlay').hide();
    //         }
    $('#loadingWithOverlay').show();
    $http({
        url: "server/cate.server.php",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "category=" + $routeParams.page
    }).then(function (response) {
        $scope.category = response.data[0];
        switch (response.data[0].cate_piority) {
            case "2":
                if (users.getVip() == 'vip1')
                    $location.path('/');
                break;
            case "3":
                if (users.getVip() == 'vip1' || users.getVip() == 'vip2')
                    $location.path('/');
                break;
            case "4":
                if (users.getVip() == 'vip1' || users.getVip() == 'vip2'|| users.getVip() == 'vip3')
                    $location.path('/');
                break;
                
        }
        $scope.order='id';
        $scope.getNew=function(){
            $scope.order='id';
            $('#getNew').addClass('active');
            $('#getView').removeClass('active');
        }
        $scope.getView=function(){
            $scope.order='product_view';
            $('#getView').addClass('active');
            $('#getNew').removeClass('active');
        }
        $scope.pages = [];
        $scope.itemsPerPage = 8;
        $scope.currentPage = 1;
        $scope.maxSize = 8;
        $scope.$watch('currentPage + itemsPerPage+order', function () {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            $scope.pages = [];
            $http({
                url: "server/pagni.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "begin=" + begin + "&end=" + $scope.itemsPerPage + "&category=" + $routeParams.page + "&status=category"+"&order="+$scope.order
            }).then(function (response) {
                $scope.totalItems = response.data['count'];
                for (let e of response.data['state']) {
                    $scope.pages.push({
                        id: e['id'],
                        name: e['product_name'],
                        category: e['product_category'],
                        author: e['product_author'],
                        image: e['product_img'],
                        view: e['product_view'],
                    });
                };

            });

        })
    });

    $scope.search = function (find) {
        $location.path('/search/' + $scope.category.cate_keyword + '/' + find);
    }

});