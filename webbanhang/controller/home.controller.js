myApp.controller('homeController', function ($scope, $http, $uibModal) {
    $scope.animationsEnabled = true;
    $scope.pages = [];
            $http({
                url: "server/pagni.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "begin=0" + "&end=4" + "&category=tin-tuc" + "&status=category"+"&order=id"
            }).then(function (response) {
                console.log(response);
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

    $scope.modalRegister = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            //   ariaLabelledBy: 'modal-title',
            //   ariaDescribedBy: 'modal-body',
            templateUrl: 'pages/modal/registermymodal.html',
            controller: 'userRegisterController',
            //   controllerAs: '$ctrl',
            size: "lg",
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };
});