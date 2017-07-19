
'use strict';

var categoryCtrl=  function($log, $scope, $mdDialog,$firebaseArray,$firebaseObject) {
	  $scope.testVar = 'categoryCtrl';
	var categoryRef = firebase.database().ref("category");
    $scope.datos = $firebaseArray(categoryRef);
    $scope.selected = [];
  
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  $scope.title = "Categorias";
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
    $scope.category =  {description:'', value:''};
     openDialog(ev);
  };
  $scope.edit = function (ev) {
      $scope.category=$scope.selected[0];
     openDialog(ev);
  };

  function openDialog(ev){
      $mdDialog.show({
      controller: DialogController,
    locals : { root : $scope },     
    templateUrl: 'views/settings/categoryform.tmpl.html',
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
    // $scope.datos = $firebaseArray(categoryRef);
    $scope.category = root.category || {description:'', value:''};
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function(category) {
        if (category.$id){
            $log.debug('actualizar');
            root.datos.$save(category);
        }
        else {
            $log.debug('nuevo');
           root.datos.$add(category); 
             
        }
      $mdDialog.hide();
    };
  }



};

module.exports = /*@ngInject*/ categoryCtrl;