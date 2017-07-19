
'use strict';

var statusCtrl=  function($log, $scope, $mdDialog,$firebaseArray,$firebaseObject) {
	  $scope.testVar = 'statusCtrl';
	var statusRef = firebase.database().ref("status");
    $scope.datos = $firebaseArray(statusRef);
    $scope.selected = [];
  
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  $scope.title = "Estados";
 $scope.headers = [
    {name:'description', title: 'Descripción', props:{}},
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
    $scope.status =  {description:'', value:''};
     openDialog(ev);
  };
  $scope.edit = function (ev) {
      $scope.status=$scope.selected[0];
     openDialog(ev);
  };

  function openDialog(ev){
      $mdDialog.show({
      controller: DialogController,
    locals : { root : $scope },     
    templateUrl: 'views/settings/statusform.tmpl.html',
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
    // $scope.datos = $firebaseArray(statusRef);
    $scope.status = root.status || {description:'', value:''};
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function(status) {
        if (status.$id){
            $log.debug('actualizar');
            root.datos.$save(status);
        }
        else {
            $log.debug('nuevo');
           root.datos.$add(status); 
             
        }
      $mdDialog.hide();
    };
  }



};

module.exports = /*@ngInject*/ statusCtrl;