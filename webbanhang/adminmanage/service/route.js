myAdmin.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('*');
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
        resolve: {
            mess: function ( user) {
                $('.navv').removeClass('active');
                $('#Home').addClass('active');
        
                if (!user.isUserLoggedIn()) {
                    location.replace('login.html');
                }
            }
        },
        templateUrl: 'template/productmanage/product.manage.html',
        controller: 'productManageController'
    })
    .when('/user', {
        resolve: {
            check: function ( user) {
                $('.navv').removeClass('active');
                $('#User').addClass('active');
                if (!user.isUserLoggedIn()) {

                    location.replace('login.html');
                }
            }
        },
        templateUrl: 'template/usermanage/user.manage.html',
        controller: 'userManageController'
    })
    .when('/product', {
        resolve: {
            check: function ( user) {
                $('.navv').removeClass('active');
                $('#Product').addClass('active');
        
                if (!user.isUserLoggedIn()) {
                    location.replace('login.html');
                }
            }
        },
        templateUrl: 'template/productmanage/product.manage.html',
        controller: 'productManageController'
    })
    .when('/profile', {
        resolve: {
            check: function ( user) {
                if (!user.isUserLoggedIn()) {
                    location.replace('login.html');
                }
            }
        },
        templateUrl: 'template/profile.html',
        controller: 'profileController'
    })
    .when('/poster', {
        resolve: {
            check: function (user) {
                $('.navv').removeClass('active');
                $('#Poster').addClass('active');

                if (!user.isUserLoggedIn()) {
                    location.replace('login.html');
                }
            }
        },
        templateUrl: 'template/postermanage/poster.manage.html',
        controller: 'posterManageController'
    })
    .when('/tags', {
        resolve: {
            check: function (user) {
                $('.navv').removeClass('active');
                $('#Tags').addClass('active');

                if (!user.isUserLoggedIn()) {
                    location.replace('login.html');
                }
            }
        },
        templateUrl: 'template/tags/tags.manage.html',
        controller: 'tagsController'
    })
    .when('/category', {
        resolve: {
            check: function (user) {
                $('.navv').removeClass('active');
                $('#Category').addClass('active');

                if (!user.isUserLoggedIn()) {
                    location.replace('login.html');
                }
            }
        },
        templateUrl: 'template/categorymanage/cate.manage.html',
        controller: 'categoryController'
    })
    .when('/admin/product/:childs', {
        resolve: {
            check: function ( user) {
                if (!user.isUserLoggedIn()) {
                    location.replace('login.html');
                }
            }
        },
        templateUrl: 'template/productmanage/product.add.html',
        controller: 'addController'
    })
    .when('/admin/user/:childs', {
        resolve: {
            check: function ( user) {
                if (!user.isUserLoggedIn()) {
  
                    location.replace('login.html');
                }
            }
        },
        templateUrl: 'template/usermanage/user.edit.html',
        controller: 'usermanageController'
    })
    .when('/admin/poster/:childs', {
        resolve: {
            check: function ( user) {
                if (!user.isUserLoggedIn()) {

                    location.replace('login.html');
                }
            }
        },
        templateUrl: 'template/postermanage/poster.add.html',
        controller: 'posterAddController'
    })
    .when('/admin/category/:childs', {
        resolve: {
            check: function ( user) {
                if (!user.isUserLoggedIn()) {

                    location.replace('login.html');
                }
            }
        },
        templateUrl: 'template/categorymanage/cate.edit.html',
        controller: 'categoryEditController'
    })
    .otherwise({
        template: '401'
    })
});