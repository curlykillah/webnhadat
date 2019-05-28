myApp.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('*');
    $routeProvider.when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    }).when('/pages/:page', {
        resolve: {
            check: function ( users,$location) {
                console.log(users.isUserLoggedIn());
                if (!users.isUserLoggedIn()) {
                    $location.path('/');
                }
            }
        },
        templateUrl: 'pages/page.html',
        controller: 'pageController'
    }).when('/pages/:page/:childs', {
        resolve: {
            check: function ( users,$location) {
                console.log(users.isUserLoggedIn());
                if (!users.isUserLoggedIn()) {
                    $location.path('/');
                }
            }
        },
        templateUrl: 'pages/child/childpage.html',
        controller: 'childController'
    }).when('/profile', {
        resolve: {
            check: function ( users,$location) {
                console.log(users.isUserLoggedIn());
                if (!users.isUserLoggedIn()) {
                    $location.path('/');
                }
            }
        },
        templateUrl: 'pages/user/userprofile.html',
        controller: 'userProfileController'
    }).when('/profile/getvip', {
        resolve: {
            check: function (users,$location) {
                console.log(users.isUserLoggedIn());
                if (!users.isUserLoggedIn()) {
                    $location.path('/');
                }
            }
        },
        templateUrl: 'pages/user/user.upvip.html',
        controller: 'userUpVipController'
    }).when('/forgotpass', {
        templateUrl: 'pages/form/form-contact.html',
        controller: 'contactController'
    }).when('/search/:page/:find', {
        resolve: {
            check: function ( users,$location) {
                console.log(users.isUserLoggedIn());
                if (!users.isUserLoggedIn()) {
                    $location.path('/');
                }
            }
        },
        templateUrl: 'pages/search.html',
        controller: 'searchController'
    }).when('/thanhtoan', {
        templateUrl: 'pages/form/form-nganluong.html',
        controller: 'thanhtoanController'
    })
    .when('/tin-tuc/:childs', {
        templateUrl: 'pages/child/tintuc.html',
        controller: 'tintucController'
    }).otherwise({
        template: '404'
    })
    $locationProvider.html5Mode({
        enabled: true,
  requireBase: false
    });
});