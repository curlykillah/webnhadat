myAdmin.controller("loginController", function ($scope, $http,user) {
    user.clearData();
    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;
        $http({
            url: "server/login.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "username=" + username + "&password=" + password
        }).then(function (response) {
            if (response.data.status == "loggedin") {
                user.saveData(response.data);
                location.replace('product');
            } else {
                alert("Error to Login");
            }
        });
        
    };
});