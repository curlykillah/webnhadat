myApp.controller('userLoginController', function ($scope, $http, users, $location, $uibModal, $uibModalInstance) {

    users.clearData();
    
    $scope.login = function () {

        var username = $scope.username;
        var password = $scope.password;
        $http({
            url: "server/user.login.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "username=" + username + "&password=" + password
        }).then(function (response) {

            if (response.data.status == "loggedin") {
                users.saveData(response.data[0]);
                location.reload();
                $location.path("/");
            } else {
                alert("Error to Login");
            }
        });
    };
    $scope.forgotmodal = function () {
        $uibModalInstance.close();
    };

})