myAdmin.controller('myHeaderController', function ($scope, user,$http,$location) {
    $scope.name = user.getName();
    $scope.end=5;
    $scope.viewMore=function(){
        $scope.end=$scope.end+3;
    }
    $scope.lockLeftsidebar=function(){
        if( $('#leftsidebar').hasClass("leftsidebar")){
            $('#leftsidebar').removeClass("leftsidebar");
        }else{
            $('#leftsidebar').addClass("leftsidebar");
        }
       
    }
    if(user.getAuthority()=='admin'){
        $scope.$watch('end', function () {
            $scope.allNoti=[];
            $http({
                url: "server/adminmanage.server.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "status=all"+"&end="+$scope.end
            }).then(function (response) {
                $scope.seen=0;
                for (let e of response.data) {
                    if(e['seen']==0){
                        $scope.seen++;
                        e['class']="noti-seen";
                    }else{
                        e['class']="";
                    }

                    $scope.allNoti.push({
                        id: e['id'],
                        name: e['name_poster'],
                        date: new Date(e['date_change']),
                        content: e['name_change'],
                        category: e['category'],
                        action: e['action'],
                        seen: e['seen'],
                        class: e['class'],
                    });
                };
            })
        })
        
    }
    $scope.touch=function(noti){
        if(noti.seen==0){
            $http({
                url: "server/adminmanage.server.php",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "status=seen"+'&id='+noti.id
            }).then(function(){
                $scope.seen--;
                noti.seen=1;
                noti.class='';
                $location.path(noti.category);
            })
        }else{
            $location.path(noti.category);
        }
        
    }

})