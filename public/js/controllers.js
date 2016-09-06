var appControllers = angular.module('appControllers', []);


app.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
    $http.post('/services/route/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Usuario Autenticado!';
      $location.url('/services/route/admin');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Autenticacion Fallida.';
      $location.url('/services/route/login');
    });
  };
});


app.controller('AdminCtrl', function($scope, $http) {
  // List of users got from the server
  $scope.users = [];

  // Fill the array to display it in the page
  $http.get('/services/route/users').success(function(users){
    for (var i in users)
      $scope.users.push(users[i]);
  });
});

app.controller("arbolesController", function ($scope, $http, userServices){
    $http.post('/services/arbolroute/arbolesdisplay').success(function(response) {

        userServices.setUser(response);
        $scope.pageUsers=userServices.getPage();
        $scope.autoPaging = userServices.autoPage()
    });


    $scope.getCurrentPage = function() {
        $scope.pageUsers=userServices.getPage();
    };

    $scope.setPageIndex =function(id) {
        userServices.setPageIndex(id);
        $scope.getCurrentPage();
    };

});

app.controller("ArbolDetailCtrl", function ($http, $scope, $routeParams){

    $http.get('/services/arbolroute/displayDetail/' + $routeParams.plantas_id)
      .success(function(data){
        $scope.arboles = data
        console.log(data)

        })
            .error(function(data) {
                console.log('Error:' + data);
        });
    
  
});

app.controller("jornadaController", function ($scope,$http, userServices, GEO){
    $http.post("/services/jornadaroute/display").success(function(response) {

        console.log("response");
        userServices.setUser(response);
         $scope.pageUsers=userServices.getPage();
        
    });


    $scope.getCurrentPage = function() {
        $scope.pageUsers=userServices.getPage();
    };

    $scope.setPageIndex =function(id) {
        userServices.setPageIndex(id);
        $scope.getCurrentPage();
    };

    angular.extend($scope, {
                yanaconas: {
                    lat: 3.423004,
                    lng: -76.606897,
                    zoom: 15
                },
                defaults: {
                    zoomAnimation: false,
                    markerZoomAnimation: false,
                    fadeAnimation: false
                },
                markers: {
                    london: {
                        lat: 51.505,
                        lng: -0.09,
                    }
                }
            });


});

app.controller("jornadaCrearController", function ($http, $scope) {
    $scope.jornada={};
    $scope.submitCreate=  function() {
        
        $http.put("/services/jornadaroute/agregarjornada",$scope.jornada).success(function(response) {

            console.log("response");

        });
    };

});


app.controller("pagolistController", function ($scope, $http, $routeParams, $modal, userServices){
    $http.get("/services/pagoroute/pagosdisplay").success(function(response) {

        console.log("response");
        userServices.setUser(response);
        $scope.pageUsers=userServices.getPage();
        $scope.autoPaging = userServices.autoPage()
    });

    $scope.getCurrentPage = function() {
        $scope.pageUsers=userServices.getPage();
    };

    $scope.setPageIndex =function(id) {
        userServices.setPageIndex(id);
        $scope.getCurrentPage();
    };

    $scope.changePagosStatus = function(pagos){
        pagos.estado = (pagos.estado=="Pagado" ? "Pendiente" : "Pagado");
        $http.put("services/pagoroute/estadopago/"+pagos.pago_id,{estado:pagos.estado});
    };

});

app.controller("pagoController", function ($http, $scope, $modal) {
    $scope.pago={};
    $scope.submitCreate=  function() {
        $http.post("/services/pagoroute/agregarpago",$scope.pago).success(function(response) {
            console.log("response");

        });
    };

    $scope.showModal=function(){
        $scope.nuevoMiembro={};
            var modalInstance = $modal.open({
                templateUrl: 'views/proveedores/lista_proveedores_modal.html',
                controller: 'proveedormodallistController'
            })
    };

});

app.controller("cotizacionlistController", function ($scope, $http, $routeParams, userServices){
    $http.get("/services/cotizacionroute/cotizaciondisplay").success(function(response) {

        console.log("response");
        userServices.setUser(response);
        $scope.pageUsers=userServices.getPage();
        $scope.autoPaging = userServices.autoPage()
    });


    $scope.getCurrentPage = function() {
        $scope.pageUsers=userServices.getPage();
    };



    $scope.setPageIndex =function(id) {
        userServices.setPageIndex(id);
        $scope.getCurrentPage();
    };


    $scope.changeCotizacionesStatus = function(cotizaciones){
        cotizaciones.estado = (cotizaciones.estado=="Aprobado" ? "Pendiente" : "Aprobado");
        $http.put("services/cotizacionroute/estadocotizacion/"+cotizaciones.cotizacion_id,{estado:cotizaciones.estado});
    };

});

app.controller("cotizacionController", function ($http, $scope) {
    $scope.cotizacion={};
    $scope.submitCreate=  function() {
        $http.put("/services/cotizacionroute/agregarcotizacion",$scope.cotizacion).success(function(response) {
            console.log("response");

        });
    };
  
});

app.controller("proveedorlistController", function ($scope, $http, $routeParams, userServices){
    $http.get("/services/proveedorroute/proveedoresdisplay").success(function(response) {

        console.log("response");
        userServices.setUser(response);
        $scope.pageUsers=userServices.getPage();
        $scope.autoPaging = userServices.autoPage()
    });


    $scope.getCurrentPage = function() {
        $scope.pageUsers=userServices.getPage();
    };



    $scope.setPageIndex =function(id) {
        userServices.setPageIndex(id);
        $scope.getCurrentPage();
    };


});

app.controller("proveedorController", function ($http, $scope) {
    $scope.proveedor={};
    $scope.submitCreate=  function() {
        
        $http.put("/services/proveedorroute/agregarproveedor",$scope.proveedor).success(function(response) {
            console.log("response");

        });
    };
  
});

app.controller("proveedormodallistController", function ($scope, $http, $routeParams, userServices){
    $http.get("/services/proveedorroute/proveedoresdisplay").success(function(response) {

        console.log("response");
        userServices.setUser(response);
        $scope.pageUsers=userServices.getPage();
        $scope.autoPaging = userServices.autoPage()
    });


    $scope.getCurrentPage = function() {
        $scope.pageUsers=userServices.getPage();
    };

    $scope.setPageIndex =function(id) {
        userServices.setPageIndex(id);
        $scope.getCurrentPage();
    };

});

app.controller("facturalistController", function ($scope, $http, $routeParams, userServices){
    $http.get("/services/facturaroute/facturasdisplay").success(function(response) {

        console.log("response");
        userServices.setUser(response);
        $scope.pageUsers=userServices.getPage();
        $scope.autoPaging = userServices.autoPage()
    });


    $scope.getCurrentPage = function() {
        $scope.pageUsers=userServices.getPage();
    };



    $scope.setPageIndex =function(id) {
        userServices.setPageIndex(id);
        $scope.getCurrentPage();
    };


    $scope.changeFacturasStatus = function(facturas){
        facturas.estado = (facturas.estado=="Pagada" ? "Pendiente" : "Pagada");
        $http.put("services/facturaroute/estadofactura/"+facturas.factura_id,{estado:facturas.estado});
    };


});

app.controller("facturaController", function ($http, $scope, $modal) {
    $scope.factura={};
    $scope.submitCreate=  function() {
        
        $http.put("/services/facturaroute/agregarfactura",$scope.factura).success(function(response) {

            console.log("response");

        });
    };

    $scope.showModalcliente=function(){
        $scope.nuevoMiembro={};
            var modalInstance = $modal.open({
                templateUrl: 'views/facturas/modal_clientes.html',
                controller: 'clientelistController'
            })
    };

});

app.controller("siembralistController", function ($scope, $http, $routeParams, userServices){
    $http.get("/services/inventarioroute/display").success(function(response) {

        console.log("response");
        userServices.setUser(response);
        $scope.pageUsers=userServices.getPage();
        $scope.autoPaging = userServices.autoPage()
    });


    $scope.getCurrentPage = function() {
        $scope.pageUsers=userServices.getPage();
    };


    $scope.setPageIndex =function(id) {
        userServices.setPageIndex(id);
        $scope.getCurrentPage();
    };

});

app.controller("siembracrearController", function ($http, $scope, $modal) {
    $scope.siembra={};
    $scope.submitCreate=  function() {
        
        $http.put("/services/inventarioroute/agregarinventario",$scope.siembra).success(function(response) {

            console.log("response");

        });
    };

    $scope.showModalarbol=function(){
        $scope.nuevoMiembro={};
            var modalInstance = $modal.open({
                templateUrl: 'views/inventario_siembras/modal_arboles.html',
                controller: 'arbolesController'
            })
    };

});

app.controller("clientelistController", function ($scope, $http, $routeParams, userServices){
    $http.get("/services/clienteroute/display").success(function(response) {

        console.log("response");
        userServices.setUser(response);
        $scope.pageUsers=userServices.getPage();
        $scope.autoPaging = userServices.autoPage()
    });


    $scope.getCurrentPage = function() {
        $scope.pageUsers=userServices.getPage();
    };

    $scope.setPageIndex =function(id) {
        userServices.setPageIndex(id);
        $scope.getCurrentPage();
    };

});

app.controller("crearclienteController", function ($http, $scope) {
    $scope.cliente={};
    $scope.submitCreate=  function() {
        
        $http.put("/services/clienteroute/agregarcliente",$scope.cliente).success(function(response) {

            console.log("response");

        });
    };

});

app.controller("avesController", function ($scope, $http, $routeParams, userServices){
    $http.post("/services/averoute/avesdisplay").success(function(response) {

        console.log("response");
        userServices.setUser(response);
        $scope.pageUsers=userServices.getPage();
        $scope.autoPaging = userServices.autoPage()
    });


    $scope.getCurrentPage = function() {
        $scope.pageUsers=userServices.getPage();
    };

    $scope.setPageIndex =function(id) {
        userServices.setPageIndex(id);
        $scope.getCurrentPage();
    };

});

app.controller("avesCrearController", function ($http, $scope) {
    $scope.ave={};
    $scope.submitCreate=  function() {
        
        $http.put("/services/averoute/agregarave",$scope.ave).success(function(response) {

            console.log("response");

        });
    };

});

app.controller("avesDetailCtrl", function ($http, $scope, $routeParams){

    $http.get('/services/averoute/displayDetail/' + $routeParams.aves_id)
      .success(function(data){
        $scope.aves = data
        console.log(data)

        })
            .error(function(data) {
                console.log('Error:' + data);
        });
    
});

app.controller('tareasController', function($scope, $http, $routeParams, $location, Tareas){

    $scope.tareas=Tareas.query();

    $scope.tarea = new Tareas();  //crear nombre

    $scope.addTarea = function() {
    $scope.tarea.$save() 
    };

    $scope.estadoTarea = function(tareas){
        tareas.estado = (tareas.estado=="Cumplida" ? "Pendiente" : "Cumplida");
        $http.put("api/tareas/"+tareas._id,{estado:tareas.estado});
    };


    $scope.dato = Tareas.get({id: $routeParams.id})

    $scope.getTotaltareas = function () {
    return $scope.tareas.length;

  };

  $scope.fecha = new Date();
  $scope.f1 = $scope.fecha.getTime();
  
  

  $scope.total2 = function(){
        var total = 0;
        angular.forEach($scope.tareas, function(item){
            total = item.fecha1.getTime();
        })

        return total;
    }
  $scope.f2 = function () {
       
     if($scope.total2 == $scope.fecha){
        console.log('cualquier cosas')
       

        
}
  }
 
    $scope.tachada = function(tareas){
        tareas.done = (tareas.done=="true" ? "false" : "true");
        $http.put("api/tareas/"+tareas._id,{done:tareas.done});
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.tareas, function(item) {
        count += item.estado ? 0 : 1;
        });

        return count;
  };
    
})

app.controller('eventoseditController', function($scope, $http, $routeParams, $location, Eventos){

  
    $scope.updateEvento = function (){
        Eventos.update($scope.dato);
        $location.path('/eventos');
    };

    $scope.dato = Eventos.show({id: $routeParams._id})


})


app.controller('eventosController', function($scope, $http, $routeParams, $location, Eventos){
  $scope.eventos=Eventos.query();

    $scope.evento = new Eventos();  //crear nombre

    $scope.addEvento = function() {
    $scope.evento.$save() 
    };
    
    $scope.dato = Eventos.get({id: $routeParams._id})

    $scope.getTotaleventos = function () {
        return $scope.eventos.length;
      };


    
    
    


})
