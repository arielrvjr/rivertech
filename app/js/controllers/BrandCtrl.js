
'use strict';

var brandCtrl=  function($log, $scope, $mdDialog,$firebaseArray,$firebaseObject) {
	  $scope.testVar = 'brandCtrl';
	var brandRef = firebase.database().ref("brand");
    $scope.datos = $firebaseArray(brandRef);
    $scope.selected = [];
    $scope.title = "Marca";
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  $scope.headers = [
    {name:'description', title: 'Descripción'},

  ];
  $scope.columns= ["description"];
  
  function success(desserts) {
    $scope.desserts = desserts;
  }
  
  $scope.remove = function(ev){
      var texto = '¿Esta seguro que desea eliminar ' + $scope.selected.length + ' ' ;
      texto += $scope.selected.length > 1 ?  'elementos? ' : 'elemento?';
    $mdDialog.show($mdDialog.confirm()
          .title('Eliminar')
          .textContent(texto)
          .targetEvent(ev)
          .ok('Aceptar')
          .cancel('Cancelar')).then(function() {
      console.log('Eliminando', $scope.selected);
      angular.forEach($scope.selected,function(el){
          $scope.datos.$remove(el);
      });
        $scope.selected = [];
    }, function() {
    });
     
  }
  $scope.addItem = function (ev) {
      $scope.brand = {description:''};
     openDialog(ev);
  };
  $scope.edit = function (ev) {
      $scope.brand=$scope.selected[0];
     openDialog(ev);
  };

  function openDialog(ev){
      $mdDialog.show({
      controller: DialogController,
    locals : { root : $scope },     
    templateUrl: 'views/settings/brandform.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    }, function() {
    });
  }

  function DialogController($scope, $mdDialog,$firebaseArray,root) {
    // $scope.datos = $firebaseArray(brandRef);
    $scope.brand = root.brand || {description:''};
    console.log('brand', $scope.brand);
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function(brand) {
        if (brand.$id){
            $log.debug('actualizar');
            root.datos.$save(brand);
        }
        else {
            $log.debug('nuevo');
           root.datos.$add(brand); 
             
        }
      $mdDialog.hide();
    };
  }



};

module.exports = /*@ngInject*/ brandCtrl;