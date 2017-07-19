
'use strict';

var inventoryCtrl=  function($log, $scope, $mdDialog,$firebaseArray,$firebaseObject) {
	  $scope.testVar = 'inventoryCtrl';
    var inventoryRef = firebase.database().ref("inventory");
    var brandRef = firebase.database().ref("brand");
	var categoryRef = firebase.database().ref("category");
    var modelRef = firebase.database().ref("model");
	var statusRef = firebase.database().ref("status");
  
    var InventoryArray = $firebaseArray.$extend({    
      getNames: function() {
        var namesRef = namesRef || [
        {ref: brandRef, id:'brand',  attr: 'brandName'}   ,
        {ref: categoryRef, id:'category',  attr: 'categoryName'} ,
        {ref: modelRef, id:'model',  attr: 'modelName'} ,  
        {ref: statusRef, id:'status',  attr: 'statusName'} ,  
        ];
        $log.debug('Ejecutando getBrandName');
        angular.forEach(this.$list, function(inventory) {
          $log.debug('referencia:', brandRef.child(inventory.brand).toString());
          angular.forEach(namesRef, function(d){
            $firebaseObject(d.ref.child(inventory[d.id])).$loaded().then(function(data) {
                inventory[d.attr] = data.description;
                $log.debug('inventory.'+d.attr, inventory[d.attr]);
            });
          });
         
       
        
        }); 
      }
   });
    $scope.marcas = $firebaseArray(brandRef);
    $scope.categorias = $firebaseArray(categoryRef);
    $scope.modelos = $firebaseArray(modelRef);
    $scope.estados = $firebaseArray(statusRef);

    $scope.datos = new InventoryArray(inventoryRef);
   
   $scope.loadDatos = function() {
      $scope.datos.$loaded().then(function(){
        $scope.datos.getNames();
      });
   }
    $scope.loadDatos();


    $log.debug('datos', $scope.datos);
    $scope.selected = [];
    $scope.title = "Inventario de Equipos";
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };
$scope.queryfilter = '';

  $scope.headers = [
    {name:'badge', title:'No. de Placa'},
    {name:'description', title: 'Descripción'},
    {name:'brandName', title:'Marca'},
    {name:'modelName', title:'Modelo'},
    {name:'serie', title:'Serie'},
    {name:'accesories', title:'Accesorios'},
    {name:'statusName', title:'Estado'},

  ];
  
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
    $scope.inventory =  {description:'', value:''};
     openDialog(ev);
  };
  $scope.edit = function (ev) {
      $scope.inventory=$scope.selected[0];
     openDialog(ev);
  };

  function openDialog(ev){
      $mdDialog.show({
      controller: DialogController,
    locals : { root : $scope },     
    templateUrl: 'views/settings/inventoryform.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true
    })
    .then(function(answer) {
      $scope.loadDatos();
    }, function() {
    });
  }

  function DialogController($scope, $mdDialog,$firebaseArray,root) {
    $scope.inventory = root.inventory || {description:''};
    $scope.marcas = root.marcas;
    $scope.modelos = root.modelos;
    console.log('modelos', $scope.modelos);
    $scope.categorias = root.categorias;
    $scope.estados = root.estados;
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function(inventory) {
        if (inventory.$id){
            $log.debug('actualizar');
            root.datos.$save(inventory);
        }
        else {
            $log.debug('nuevo');
           root.datos.$add(inventory); 
             
        }
      $mdDialog.hide();
    };
  }



};

module.exports = /*@ngInject*/ inventoryCtrl;