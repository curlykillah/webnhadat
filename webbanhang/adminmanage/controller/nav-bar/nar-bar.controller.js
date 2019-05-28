myAdmin.controller('narBarController', function ($scope,user,$http) {

    $scope.userprofile={};
    $scope.user={};
    if (!user.isUserLoggedIn()) {
        $scope.navAdmin=[
        ];
    } else {
        switch(user.getAuthority()){
            case "admin":
                $scope.navAdmin=[
                    {name:"Product",location:"product"},
                    {name:"User",location:"user"},
                    {name:"Poster",location:"poster"},
                    {name:"Tags",location:"tags"},
                    {name:"Category",location:"category"},
                ];
                $scope.image = "images/chat-avatar2.png";
                break;
            case "post":
            $scope.navAdmin=[
                {name:"Product",location:"product"},
                {name:"User",location:"user"},
                {name:"Poster",location:"poster"},
                {name:"Tags",location:"tags"},
                {name:"Category",location:"category"},
            ];
                $scope.image = "images/atomix_user31.png"
                break;
        }
        $http({
            url: "server/poster.server.php",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "userid=" + user.getID() + "&state=" + "id"
        }).then(function (response) {

            for (let e of response.data) {
                $scope.userprofile.id = e['ID'];
                $scope.userprofile.name = e['username'];
                $scope.userprofile.password = e['password'];
                $scope.userprofile.authority = e['authority'];
            };
            $scope.user = $scope.userprofile;
            
        });
    };
    $scope.allCate = [];
    $scope.logout=function(){

        location.reload();
    }
 
   

})