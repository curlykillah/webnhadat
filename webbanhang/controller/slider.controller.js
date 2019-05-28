myApp.controller('slideController',function($scope,$http,$uibModal){
    $scope.allSlide=[];
    $http({
        method: "POST",
        url: "server/slide.server.php",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "status=all"+'&order=id'
    }).then(function (response) {
        $scope.number=0;
        for (let e of response.data) {
            if($scope.number==0){
                $scope.class='active';
            }else{
                $scope.class='';
            }
            $scope.allSlide.push({
                id: e['id'],
                name: e['product_name'],
                mota: e['product_mota'],
                category: e['product_category'],
                image: e['product_img'],
                number:$scope.number,
                class:$scope.class
            });
           
            $scope.number++;
        };

        // $("#slideMota").html("Hello <b>world!</b>");
        // console.log(document.getElementById('test'));
        $("#slide0").addClass('active');
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

})