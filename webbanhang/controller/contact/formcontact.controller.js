myApp.controller('formContactController',function($scope){
    $scope.submitted=false;
    $scope.submit=function(){
        $scope.submitted=true;
    }
    document.getElementById('hidden_iframe').onload = function () {
        if( $scope.submitted){
            alert('Gửi thành công!');
        }
    }
})