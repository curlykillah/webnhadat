myApp.controller('narBarController', function ($scope, $http, users,$uibModal) {

    if(users.isUserLoggedIn() ){
        $('#username').text(users.getName());
    }
    $scope.allCate = [];
    $scope.logout=function(){
        location.reload();
        users.clearData();
    }

    switch (users.getVip()) {
        case 'vip1':
            $http({
                method: "POST",
                url: "server/nav-bar.server.php",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: 'vip=' + 1

            }).then(function (response) {
                $scope.allCate=response.data;

            });
            break;
        case 'vip2':
            $http({
                method: "POST",
                url: "server/nav-bar.server.php",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: 'vip=' + 2

            }).then(function (response) {
                $scope.allCate=response.data;

            });
            break;
            case 'vip3':
            $http({
                method: "POST",
                url: "server/nav-bar.server.php",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: 'vip=' + 3

            }).then(function (response) {
                $scope.allCate=response.data;

            });
            break;
            case 'vip4':
            $http({
                method: "POST",
                url: "server/nav-bar.server.php",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: 'vip=' + 4

            }).then(function (response) {
                $scope.allCate=response.data;
            });
            break;


    };

    $scope.animationsEnabled = true;
    $scope.modalLogin = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
            templateUrl: 'pages/modal/loginmymodal.html',
            controller: 'userLoginController',
            //   controllerAs: '$ctrl',
            //   size: "lg",
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };

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
})