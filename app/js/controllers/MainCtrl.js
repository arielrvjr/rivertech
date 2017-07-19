'use strict';

var mainCtrl = function($log,$location,$rootScope,$window,$mdMedia,$mdSidenav,$firebaseArray,LoginService) {
 
      var originatorEv;

 	$rootScope.toggleLeft =  function() { $mdSidenav('left').toggle(); };

  
     
    $rootScope.currentUser = function(){
     return LoginService.currentUser();
    };

    $rootScope.openMenu = function($mdMenu, ev){
      originatorEv = ev;
      $mdMenu.open(ev);
    };
    
    $rootScope.navigateTo = function(url){
        $location.path(url);
        $mdSidenav('left').close();
    };

    $rootScope.logout =function(){
      LoginService.logout();
    };

    $rootScope.settings = [
      {icon: 'assignment', url:'/inventory', name: 'Inventario'},
      // {icon: 'event', url:'/event', name: 'Eventos'},
      // {icon: 'assignment_turned_in', url:'/assignment', name: 'Gestión de Equipos'},

    ];
       $rootScope.catalogos = [
    {icon:'branding_watermark', url:'/settings/category', name: 'Categorias'},
    {icon:'branding_watermark', url:'/settings/brand', name: 'Marcas'},
    {icon:'branding_watermark', url:'/settings/model', name: 'Modelos'},
    {icon:'branding_watermark', url:'/settings/status', name: 'Estados'},
    ];
};

module.exports = mainCtrl;

