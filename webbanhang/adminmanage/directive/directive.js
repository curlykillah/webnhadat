
myAdmin.directive('navBarDirective', function () {
    return {
        restrict : "C",
        templateUrl: "template/directive/nav-bar.html",
        controller:'narBarController',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myAdmin.directive('myHeader', function () {
    return {
        templateUrl: "template/directive/my-header.html",
        controller:'myHeaderController',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});

myAdmin.directive('productManage', function () {
    return {
        templateUrl: "pages/admin/productmanage/product.manage.html",
        controller:'productManageController',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myAdmin.directive('userManage', function () {
    return {
        templateUrl: "pages/admin/usermanage/user.manage.html",
        controller:'userManageController',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});
myAdmin.directive('posterManage', function () {
    return {
        templateUrl: "pages/admin/postermanage/poster.manage.html",
        controller:'posterManageController',
        // replace: true,
        scope: {
            pageObject: "="
        }
    }
});