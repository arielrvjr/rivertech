
'use strict';

var modelCtrl=  function($log, $scope, $mdDialog,$firebaseArray,$firebaseObject) {
	  $scope.testVar = 'modelCtrl';
  var modelRef = firebase.database().ref("model");
    var brandRef = firebase.database().ref("brand");
    var ModelArray = $firebaseArray.$extend({
      getBrandName: function() {
        $log.debug('Ejecutando getBrandName');
        angular.forEach(this.$list, function(model) {
          $log.debug('referencia:', brandRef.child(model.brand).toString());
         $firebaseObject(brandRef.child(model.brand)).$loaded().then(function(data) {
            model.brandName = data.description;
            $log.debug('model.brandName', model.brandName);
          });
        
        }); 
      }
   });
    $scope.brands = $firebaseArray(brandRef);
    $scope.datos = new ModelArray(modelRef);
   
   $scope.loadDatos = function() {
      $scope.datos.$loaded().then(function(){
        $scope.datos.getBrandName();
      });
   }
    $scope.loadDatos();


    $log.debug('datos', $scope.datos);
    $scope.selected = [];
    $scope.title = "Modelos";
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  $scope.headers = [
    {name:'brandName', title:'Marca'},
    {name:'description', title: 'Descripción'},
  ];
  $scope.columns= ["brandName","description"];
  
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
    $scope.model =  {description:'', value:''};
     openDialog(ev);
  };
  $scope.edit = function (ev) {
      $scope.model=$scope.selected[0];
     openDialog(ev);
  };

  function openDialog(ev){
      $mdDialog.show({
      controller: DialogController,
    locals : { root : $scope },     
    templateUrl: 'views/settings/modelform.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.loadDatos();
    }, function() {
    });
  }

  function DialogController($scope, $mdDialog,$firebaseArray,root) {
    $scope.model = root.model || {description:''};
    $scope.brands = root.brands;
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function(model) {
        if (model.$id){
            $log.debug('actualizar');
            root.datos.$save(model);
        }
        else {
            $log.debug('nuevo');
           root.datos.$add(model); 
             
        }
      $mdDialog.hide();
    };
  }



};

module.exports = /*@ngInject*/ modelCtrl;