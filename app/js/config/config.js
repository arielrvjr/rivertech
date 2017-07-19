'use strict';
var moment = require('moment');

module.exports =/* @ngInject */ function($routeProvider,$mdThemingProvider,$mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('DD-MM-YYYY');
    };
	$mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('blue');
    $mdThemingProvider.enableBrowserColor();
    $routeProvider
    .when('/login', {
        templateUrl : 'views/login.html',
        controller : 'LoginCtrl'
    })
    .when('/settings/brand', {
        templateUrl : 'views/settings/crud.html',
        controller : 'BrandCtrl'
    })
    .when('/settings/category', {
        templateUrl : 'views/settings/crud.html',
        controller : 'CategoryCtrl'
    })
    .when('/settings/model', {
        templateUrl : 'views/settings/crud.html',
        controller : 'ModelCtrl'
    })
    .when('/settings/status', {
        templateUrl : 'views/settings/crud.html',
        controller : 'StatusCtrl'
    })
    .when('/inventory', {
        templateUrl : 'views/settings/crud.html',
        controller : 'InventoryCtrl'
    })
    // .when('/reports/statisticsperhour', {
    //     templateUrl : 'views/reports/statisticsperhour.html',
    //     controller : 'StatisticsPerHourCtrl'

    // })
    // .when('/reports/topusers', {
    //     templateUrl : 'views/reports/topusers.html',
    //     controller : 'TopUsersCtrl'

    // })
 
    // .when('/register', {
    //     templateUrl : 'views/register.html',
    //     controller : 'LoginCtrl'
    // })
    // .when('/place', {
    //     templateUrl : 'views/place.html',
    //     controller : 'PlaceCtrl'
    // })
    // .when('/place/:id', {
    //     templateUrl : 'views/showplace.html',
    //     controller : 'PlaceCtrl'
    // })
    // .when('/comment', {
    //     templateUrl : 'views/comment.html',
    //     controller : 'CommentCtrl'
    // })
    // .when('/main', {
    //     templateUrl : 'views/main.html'
    // });
    
};
