
'use strict';

var loginCtrl=  function($log, $scope,LoginService) {
	  $scope.testVar = 'LoginCtrl';
		$scope.user = {};
	  $scope.loginFacebook = function(){
	  	$log.debug('Iniciar Sesion Facebook');
	  	LoginService.loginFacebook();
	  };
	  $scope.loginGoogle = function(){
	  	$log.debug('Iniciar Sesion Google');
	  	LoginService.loginGoogle();
	  };

	  $scope.register = function(){
		$log.debug('Registrar Usuario');
	  	LoginService.register($scope.user);
	  };
	  $scope.login = function(){
		$log.debug('Iniciar sesion');
	  	LoginService.login($scope.user);
	  };

	  

};

module.exports = /*@ngInject*/ loginCtrl;
