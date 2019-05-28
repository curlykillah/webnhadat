myAdmin.controller("imageModalController",function($scope,$http,$uibModalInstance,user){
    user.isUserLoggedIn();
    $scope.pages=[];
    $scope.test=[];
    $scope.imagecontent='';

    $scope.check= function(page){
        page.check=!page.check;
        if(page.check==true){
            $scope.test.push(page.image);
            document.getElementById(page.id).style.background = '#b3b3cd';
        }
        else if(page.check==false){
            var index=$scope.test.indexOf(page.image);
            $scope.test.splice(index, 1);
            document.getElementById(page.id).style.background = "white";
        }

    };

    $scope.btnOk=function(){

        for(let e of $scope.test){
            $scope.imagecontent=$scope.imagecontent+'<p><img alt="" src="http://localhost/www/webbanhang/image/'+e+'"  /></p>';
        }

        $uibModalInstance.close($scope.imagecontent);
    }

    $scope.btnCancel=function(){
        $uibModalInstance.close($scope.imagecontent);
    };


    $scope.btnUpload=function(){
        var fd = new FormData();

        angular.forEach($scope.files, function (file) {
            fd.append('file', file);
            
        });
        $http({
            method: 'POST',
            url: 'server/upload.php',
            data: fd,
            transformRequest: angular.indentity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function(response){

            $scope.imagecontent=$scope.imagecontent+'<p><img alt="" src="http://localhost/www/webbanhang/image/'+response.data.name+'"  /></p>';
            $uibModalInstance.close($scope.imagecontent);
        });
        
    };

    $scope.delete=function(page){
        if(user.getName()!="admin"){
            alert('Bạn không có quyền xóa');
        }else{
            var isConfirmDelete = confirm('Bạn có chắc muốn xóa dữ liệu này???');
            if (isConfirmDelete == true) {
                $http({
                    url: "server/removefile.php",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: 'id='+page.image
                }).then(function (response) {
        
                    var index = $scope.pages.indexOf(page);
                    $scope.pages.splice(index, 1);
                });
            }
            
        }   
    }

    $http({
        method:"POST",
        url:"server/image.service.php",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    }).then(function(response){
        for (let e of response.data) {
            $scope.pages.push({
                id: e['img_id'],
                image: e['img_name'],
                check:false
            });
           
        };
        
    })
})