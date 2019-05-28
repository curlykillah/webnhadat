myAdmin.directive('fileInput', function ($parse) {
    return {
        link: function ($scope, element, attrs) {
            element.bind("change", function (event) {
                console.log(event.target.files[0]);
                var output= document.getElementById('output');
                output.src= URL.createObjectURL(event.target.files[0]);
                $parse(attrs.fileInput).assign($scope, element[0].files);
                $scope.$apply();
            })
        }
    }
});