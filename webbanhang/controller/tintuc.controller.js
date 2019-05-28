myApp.controller('tintucController',function($http,$scope,$routeParams){
    $scope.name = $routeParams.childs;
        $scope.pages = [];
        $http({
            url: "server/server.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "id= " + $scope.name+"&category=tin-tuc" + "&status=" + "id"
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
            document.getElementById('contentChild').innerHTML = $scope.pages.content;
 
            $scope.newpages = [];
            $http({
                url: "server/product.random.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "begin=0" + "&end=4" + "&category=tin-tuc"
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
})