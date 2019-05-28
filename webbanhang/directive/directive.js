myApp.directive('listResult', function () {
    return {
        templateUrl: "pages/directive/list-result.html",
        controller:'',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myApp.directive('listTintuc', function () {
    return {
        templateUrl: "pages/directive/list-tintuc.html",
        controller:'',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myApp.directive('navBarDirective', function () {
    return {
        
        templateUrl: "pages/directive/nav-bar.html",
        controller:'narBarController',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myApp.directive('homeNavBar', function () {
    return {
        
        templateUrl: "pages/directive/home-nav-bar.html",
        controller:'narBarController',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myApp.directive('mySlider', function () {
    return {
        templateUrl: "pages/directive/slider.html",
        controller:'slideController',
        // replace: true,
    }
});
myApp.directive('myContact', function () {
    return {
        templateUrl: "pages/directive/contact.html",
        controller:'formContactController',
        // replace: true,
        // scope: {
        //     pageObject: "="
        // }
    }
});
myApp.directive('myHeader', function () {
    return {
        templateUrl: "pages/directive/my-header.html",
        controller:'myHeaderController',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myApp.directive('myFooter', function () {
    return {
        templateUrl: "pages/directive/my-footer.html",
        controller:'',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myApp.directive('productManage', function () {
    return {
        templateUrl: "pages/admin/productmanage/product.manage.html",
        controller:'productManageController',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myApp.directive('userManage', function () {
    return {
        templateUrl: "pages/admin/usermanage/user.manage.html",
        controller:'userManageController',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myApp.directive('posterManage', function () {
    return {
        templateUrl: "pages/admin/postermanage/poster.manage.html",
        controller:'posterManageController',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myApp.filter('trustHtml',function($sce){
    return function(html){
      return $sce.trustAsHtml(html);
    }
  });