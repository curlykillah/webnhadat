myApp.controller('userUpVipController', function (users, $scope, $http, $location) {
    $scope.userprofile={};
    $http({
        url: "server/user.profile.php",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "userid=" + users.getId()
    }).then(function (response) {
        $scope.userprofile.email = response.data[0].email;
        $scope.userprofile.firstName = response.data[0].user_firstname;
        $scope.userprofile.lastName = response.data[0].user_lastname;
    });
    switch (users.getVip()) {
        case 'vip1':
            $scope.vip = "vip2";
            $scope.old='Beginner';
            $scope.options=[
                {name:"Learner",location:"vip2"},
                {name:"Practitioner",location:"vip3"},
                {name:"Master Practitioner",location:"vip4"},
            ];
            break;
        case 'vip2':
            $scope.vip = "vip3";
            $scope.old='Learner';
            $scope.options=[
                {name:"Practitioner",location:"vip3"},
                {name:"Master Practitioner",location:"vip4"},
            ];
            break;
        case 'vip3':
            $scope.vip = "vip4";
            $scope.old='Practitioner';
            $scope.options=[
                {name:"Master Practitioner",location:"vip4"},
            ];
            break;
        case 'vip4':
            alert('Bạn Đã đạt Master Practitioner');
            $location.path('/profile')
            break;
    }
    $scope.result=false;
    $scope.$watch('vip', function () {
        switch ($scope.vip) {
            case 'vip2':
            $scope.result=false;
                $scope.price=50000;
                $('#begin').removeClass('hide');
                $('#high').addClass('hide');
                break;
            case 'vip3':
            $scope.result=false;
                $scope.price=100000;
                $('#begin').addClass('hide');
                $('#high').removeClass('hide');
                break;
            case 'vip4':
            $scope.result=false;
            $scope.price=150000;
                $('#begin').addClass('hide');
                $('#high').removeClass('hide');
                break;
        }
    })
    $scope.filename = '';
    $scope.edit = function () {
        alert('Nang cap ne!!!');
        // if($scope.vip=='vip3' || $scope.vip=='vip4'){
        //     var fd = new FormData();
        // angular.forEach($scope.files, function (file) {
        //     fd.append('file', file);
        // });
        // $http({
        //     method: 'POST',
        //     url: 'server/upload.php',
        //     data: fd,
        //     transformRequest: angular.indentity,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // }).then(function (response) {
        //     console.log(response)
        //     if (response.data.status == 'error') {
        //         $scope.result=false;
        //         $('#emailAlertSuccess').addClass('hide');
        //         $('#emailAlertError').removeClass('hide');
        //             $scope.error='Đề nghị gắn hình';
        //     }else if (response.data.status == "error type" || response.data.status == "error size") {
        //         $scope.result=false;
        //         $('#emailAlertSuccess').addClass('hide');
        //         $('#emailAlertError').removeClass('hide');
        //         $scope.error="Lỗi :" + response.data;
        //     }else {
        //             $scope.filename = response.data.name;
        //         $http({
        //             url: "server/user.service.php",
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/x-www-form-urlencoded"
        //             },
        //             data: "name=" + users.getName() + "&vip=" + $scope.vip + '&state=upvip' + '&file=' + $scope.filename
        //         }).then(function (respone) {
        //             switch ($scope.vip) {
        //                 case 'vip2':
        //                     $scope.price=50000;
        //                     break;
        //                 case 'vip3':
        //                     $scope.price=100000;
        //                     break;
        //                 case 'vip4':
        //                 $scope.price=150000;
        //                     break;
        //             }
        //             $scope.email= $scope.userprofile.email;
        //             $scope.name='Người Dùng';
        //             $scope.phone=0;
        //             $scope.result=true;
        //             $('#emailAlertSuccess').removeClass('hide');
        //             $('#emailAlertError').addClass('hide');
        //         })
        //     }
        // })
        // }else{
        //     $scope.filename = '';
        //     $http({
        //         url: "server/user.service.php",
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded"
        //         },
        //         data: "name=" + users.getName() + "&vip=" + $scope.vip + '&state=upvip' + '&file=' + $scope.filename
        //     }).then(function (respone) {
        //         switch ($scope.vip) {
        //             case 'vip2':
        //                 $scope.price=50000;
        //                 break;
        //             case 'vip3':
        //                 $scope.price=100000;
        //                 break;
        //             case 'vip4':
        //             $scope.price=150000;
        //                 break;
        //         }
        //         $scope.email= $scope.userprofile.email;
        //         $scope.name='Người Dùng';
        //         $scope.phone=0;
        //         $scope.result=true;
        //         $('#emailAlertSuccess').removeClass('hide');
        //         $('#emailAlertError').addClass('hide');
        //     })
        // };

        // document.getElementById('frmThanhToan').onsubmit = function () {
        //     return $scope.result;
        // }
    }
})