//ANTES DE PUBLICAR
// Modificar a $rootScope.ageOk = false;
// Modificar a $rootScope.zona = false;


var app = angular.module('jagerginApp', ['ui.router', 'sticky', 'ngScrollable', 'ngGeolocation', 'uiGmapgoogle-maps', 'sbDateSelect', 'ngSanitize']);


app.run(function($rootScope){
  $rootScope.ageOk = true;
  $rootScope.zona = true;
});



app.factory("SettingSvc", function(){
		//Your Website URL
		var url = 'http://dbo.space/jagergin';
		function getRootUrl(){
			return url + '/cms/api';
		}
		function getPhotoUrl(){
			return url + '/cms/api/imageFiles/';
		}
		return {
		    getRootUrl : getRootUrl,
		    getPhotoUrl : getPhotoUrl
		};
	});



app.config(function($stateProvider, $urlRouterProvider, $httpProvider){

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $urlRouterProvider.otherwise("/inicio");

  $stateProvider
    .state("inicio", {
      url: "/inicio",
      templateUrl: "inicio.html",
      controller: "InicioCtrl"
    })
    .state("acceso", {
      url: "/acceso",
      templateUrl: "acceso.html",
      controller: "AccesoCtrl"
    })
    .state("mi-perfil", {
      url: "/mi-perfil",
      templateUrl: "mi-perfil.html",
      controller: "MiPerfilCtrl"
    })
    .state("carrito", {
      url: "/carrito",
      templateUrl: "carrito.html",
      controller: "CarritoCtrl"
    })
    .state("checkout", {
      url: "/checkout",
      templateUrl: "checkout.html",
      controller: "CheckoutCtrl"
    })
});
