myApp.controller('childController', function ($scope, $routeParams, $http, users, $location) {
    $scope.cate = $routeParams.page;
    $scope.keyword = $routeParams.childs;
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
                if (users.getVip() == 'vip1' || users.getVip() == 'vip2' || users.getVip() == 'vip3')
                    $location.path('/');
                break;
        }
        $scope.name = $routeParams.childs;
        $scope.pages = [];
        $http({
            url: "server/server.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "id= " + $scope.name+"&category=" +$routeParams.page + "&status=" + "id"
        }).then(function (response) {

            for (let e of response.data) {
                $scope.pages['id'] = e['id'];
                $scope.pages['name'] = e['product_name'];
                $scope.pages['content'] = e['product_content'];
                $scope.pages['image'] = e['product_img'];
                $scope.pages['author'] = e['product_author'];
                $scope.pages['tags'] = e['tags'];
                if (e['tags'] != '') {
                    $scope.pages['tags'] = angular.fromJson(e['tags']);
                }
                $scope.pages['view'] = e['product_view'];
            };
            $scope.pages.view++;
            $http({
                url: "server/service.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "view=" + $scope.pages.view + '&state=view' +'&id='+$scope.pages.id
            });
            document.getElementById('contentChild').innerHTML = $scope.pages.content;
            $scope.newpages = [];
            $http({
                url: "server/product.random.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "begin=0" + "&end=4" + "&category=" + $routeParams.page 
            }).then(function (response) {

                for (let e of response.data) {
                    $scope.newpages.push({
                        id: e['id'],
                        name: e['product_name'],
                        category: e['product_category'],
                        author: e['product_author'],
                        image: e['product_img'],
                        view: e['product_view'],
                    });
                };

            });
        });
    });
    $scope.search = function (find) {
        $location.path('/search/' + $routeParams.page + '/' + find);
    }

})