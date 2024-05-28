var aplicacionServicioDeCarga = angular.module("aplicacionServicioDeCarga", []);

aplicacionServicioDeCarga.directive('toolbar', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/toolbar.html',
        controller: function() {
            this.tab = 1;
            this.selectTab = function(setTab) {
                this.tab = setTab;
            };
            this.isSelected = function(tabParam) {
                return this.tab === tabParam;
            };
        },
        controllerAs: 'toolbar'
    };
});

aplicacionServicioDeCarga.directive("usuarioForm", function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/usuario-form.html',
        controller: 'usuarioCtrl'
    };
});

/*aplicacionServicioDeCarga.controller("usuarioCtrl", function($http, $scope) {
    $scope.usuario = {};
    $scope.addUsuario = function() {
        $http.post('http://localhost:8080/usuarios/add', $scope.usuario)
            .then(function(response) {
                $scope.usuario = {};
                $scope.toolbar.selectTab(2);  // Cambia a la pestaña de lista de usuarios
            }, function(error) {
                console.error('Error:', error);
            });
    };
});*/

aplicacionServicioDeCarga.controller("usuarioCtrl", function($http, $scope) {
    $scope.addUsuario = function() {
        console.log('name');
        $http.post('http://localhost:8080/usuarios/add', JSON.stringify($scope.usuario))
            .success(function(data, headers) {
                $scope.usuario = {};
                $scope.toolbar.selectTab(2);
            });
    };
});

aplicacionServicioDeCarga.directive("usuarioList", function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/usuario-list.html',
        controller: 'usuarioListCtrl'
    };
});

aplicacionServicioDeCarga.controller("usuarioListCtrl", function($http, $scope) {
    function loadUsuarios() {
        $http.get('http://localhost:8080/usuarios/get')
            .then(function(response) {
                $scope.usuarios = response.data;
            }, function(error) {
                console.error('Error:', error);
            });
    };
    
    
    $scope.editUsuario = function(id) {
    $scope.toolbar.selectTab(1);
    
    // Obtener los datos del usuario que deseas editar
    var usuarioAEditar = loadUsuarios(id); // Debes implementar esta función
    
    // Realizar la solicitud PUT con los datos del usuario a editar
    $http.put('http://localhost:8080/usuarios/update/' + id, usuarioAEditar, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(function(response) {
        loadUsuarios();
    }, function(error) {
        console.error('Error:', error);
    });
};




    $scope.deleteUsuario = function(id) {
        $http.delete('http://localhost:8080/usuarios/delete/' + id)
            .then(function(response) {
                loadUsuarios();
            }, function(error) {
                console.error('Error:', error);
            });
    };

    loadUsuarios();
});


aplicacionServicioDeCarga.controller("vehiculoCtrl", function($http, $scope) {
    $scope.vehiculo = {};
    $scope.addVehiculo = function() {
        $http.post('http://localhost:8080/vehiculos/add', $scope.vehiculo)
            .then(function(response) {
                $scope.vehiculo = {};
                $scope.toolbar.selectTab(4);  // Cambia a la pestaña de lista de vehículos
            }, function(error) {
                console.error('Error:', error);
            });
    };
});

aplicacionServicioDeCarga.controller("vehiculoListCtrl", function($http, $scope) {
    function loadVehiculos() {
        $http.get('http://localhost:8080/vehiculos/get')
            .then(function(response) {
                $scope.vehiculos = response.data;
            }, function(error) {
                console.error('Error:', error);
            });
    };

    $scope.editVehiculo = function(vehiculo) {
        $scope.vehiculo = angular.copy(vehiculo);
        $scope.toolbar.selectTab(3);
    };

    $scope.deleteVehiculo = function(id) {
        $http.delete('http://localhost:8080/vehiculos/delete/' + id)
            .then(function(response) {
                loadVehiculos();
            }, function(error) {
                console.error('Error:', error);
            });
    };

    loadVehiculos();
});

aplicacionServicioDeCarga.directive("vehiculoForm", function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/vehiculo-form.html',
        controller: 'vehiculoCtrl'
    };
});

aplicacionServicioDeCarga.directive("vehiculoList", function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/vehiculo-list.html',
        controller: 'vehiculoListCtrl'
    };
});

aplicacionServicioDeCarga.service('SolicitudService', function($http) {
    this.getSolicitudes = function() {
        return $http.get('http://localhost:8080/solicitudes/get');
    };

    this.createSolicitud = function(solicitud) {
        return $http.post('http://localhost:8080/solicitudes/add', solicitud);
    };

    this.updateSolicitud = function(id, solicitud) {
        return $http.put('http://localhost:8080/solicitudes/update/' + id, solicitud);
    };

    this.deleteSolicitud = function(id) {
        return $http.delete('http://localhost:8080/solicitudes/delete/' + id);
    };
});

aplicacionServicioDeCarga.controller("solicitudFormCtrl", function($scope, SolicitudService) {
    $scope.newSolicitud = {};

    $scope.addSolicitud = function() {
        SolicitudService.createSolicitud($scope.newSolicitud).then(function(response) {
            $scope.newSolicitud = {};  // Limpiar el formulario
            $scope.toolbar.selectTab(6);  // Cambiar a la pestaña de lista de solicitudes
        }, function(error) {
            console.error('Error:', error);
        });
    };
});

aplicacionServicioDeCarga.directive("solicitudForm", function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/solicitud-form.html',
        controller: 'solicitudFormCtrl'
    };
});

aplicacionServicioDeCarga.controller("solicitudListCtrl", function($scope, SolicitudService) {
    function loadSolicitudes() {
        SolicitudService.getSolicitudes().then(function(response) {
            $scope.solicitudes = response.data;
        }, function(error) {
            console.error('Error:', error);
        });
    }

    $scope.editSolicitud = function(solicitud) {
        $scope.solicitud = angular.copy(solicitud);
        $scope.toolbar.selectTab(5);  // Cambia a la pestaña de formulario de solicitud
    };

    $scope.deleteSolicitud = function(id) {
        SolicitudService.deleteSolicitud(id).then(function(response) {
            loadSolicitudes();
        }, function(error) {
            console.error('Error:', error);
        });
    };

    loadSolicitudes();  // Cargar las solicitudes al iniciar
});

aplicacionServicioDeCarga.directive("solicitudList", function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/solicitud-list.html',
        controller: 'solicitudListCtrl'
    };
});




