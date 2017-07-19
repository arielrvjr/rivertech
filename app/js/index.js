'user strict';
global.firebase = require('firebase');
var angular = require('angular'); 
var ngMaterial = require('angular-material');
var ngRoutes = require('angular-route');
var angularfire = require('angularfire');
var angularMoment = require('angular-moment');
var highchartsNg = require('highcharts-ng');

//config;
var Config = require('./config/config.js');
var configFirebase = require('./config/firebaseconfig');
global.firebase.initializeApp(configFirebase());

var app = angular.module('inventario', 
[ngMaterial, ngRoutes,angularfire,angularMoment,
    highchartsNg,require('angular-material-data-table'),require('angular-animate'),
require('angular-aria')]);
app.config(Config);

//service
app.factory('LoginService', ['$log','$rootScope','$firebaseAuth','$location','$mdToast', require('./services/LoginService')]);


//controllers
app.controller('MainCtrl', 
['$log','$location', '$rootScope','$window','$mdMedia','$mdSidenav',
'$firebaseArray','LoginService', require('./controllers/MainCtrl')]);

//settings controller
app.controller('LoginCtrl', ['$log', '$scope','LoginService', require('./controllers/LoginCtrl')]);
app.controller('StatusCtrl', ['$log', '$scope','$mdDialog', '$firebaseArray', '$firebaseObject', require('./controllers/StatusCtrl')]);
app.controller('ModelCtrl', ['$log', '$scope','$mdDialog', '$firebaseArray', '$firebaseObject', require('./controllers/ModelCtrl')]);
app.controller('BrandCtrl', ['$log', '$scope','$mdDialog', '$firebaseArray', '$firebaseObject', require('./controllers/BrandCtrl')]);
app.controller('CategoryCtrl', ['$log', '$scope','$mdDialog', '$firebaseArray', '$firebaseObject', require('./controllers/CategoryCtrl')]);

//action controller
app.controller('InventoryCtrl', ['$log', '$scope','$mdDialog', '$firebaseArray', '$firebaseObject', require('./controllers/InventoryCtrl')]);


app.run(['$rootScope', '$location','$mdToast','LoginService', require('./services/RunService')]);

