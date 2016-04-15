



app.controller("DownloadAppCtrl", ['$scope', function($scope){
  $scope.viewed = false;
}]);



app.controller("InicioCtrl", function($scope, $rootScope, $state, $geolocation, $http, $q, ProductsSvc){
  sliders();
  $scope.$geolocation = $geolocation;
  $scope.userLat;
  $scope.userLng;
  //Age Ok?
  if(!$rootScope.ageOk){ $state.go('acceso'); }
  //Zona Ok?
  if(!$rootScope.zona){
    $geolocation.getCurrentPosition().then(function(position, $geolocation) {
      $scope.myPosition = position;
      $scope.userLat = position.coords.latitude;
      $scope.userLng = position.coords.longitude;
      var geocoder = new google.maps.Geocoder();
      $scope.map = {
        center: {
          latitude: $scope.userLat,
          longitude: $scope.userLng
        },
        zoom: 12
      };
    });
    $scope.polygons = zonaDraw;
  }//zona
  //#############
  //products
  $scope.products = [];
  $scope.images = [];
  $scope.categories = [];
  $scope.cartCount;
  $scope.category;
  $scope.productsByCategory;

  $scope.category = 0;

  $scope.productsList;

  $scope.searchBar = "";
  $scope.searchPlaceholder = "Buscar en JagerGin";

  if($scope.category==0){
    ProductsSvc.list(0, 1000, 0).then(function(result){
      $scope.productsList = result.data;
    });
  }

  $scope.CategoryFn = function(cat, where){
    $scope.category = cat;
    $scope.searchBar = "";
    if($scope.category==0){
      ProductsSvc.list(0, 1000, 0).then(function(result){
        $scope.productsList = result.data;
        $scope.searchPlaceholder = "Buscar en JagerGin";
      });
    } else {
      ProductsSvc.findByCategoryId(cat).then(function(result){
        $scope.productsList = result.data;
        $scope.searchPlaceholder = "Buscar en "+where;
      });
    }
  }


}); //InicioCtrl

app.controller("AccesoCtrl", function($scope, $rootScope, $state){
  sliders();
  if($rootScope.ageOk){ $state.go('inicio'); }
  moment.locale('es');
  $scope.born = { date : null }
  $scope.$watch('born.date', function(newval, oldval){
    var current = moment();
    var dif = current.diff(newval, 'years');
    if(dif>=18){
      $rootScope.ageOk = true;
      $state.go('inicio');
    }
  });
});

app.controller("MiPerfilCtrl", function($scope, $rootScope, $state){
  if(!$rootScope.ageOk){ $state.go('acceso'); }
});

app.controller("CarritoCtrl", function($scope, $rootScope, $state){
  if(!$rootScope.ageOk){ $state.go('acceso'); }
});

app.controller("CheckoutCtrl", function($scope, $rootScope, $state, $geolocation){
  if(!$rootScope.ageOk){ $state.go('acceso'); }

  $scope.order= {};

  $scope.address="";
  $scope.$geolocation = $geolocation;
  $scope.userLat;
  $scope.userLng;

  $geolocation.getCurrentPosition().then(function(position, $geolocation) {
    $scope.myPosition = position;
    $scope.userLat = position.coords.latitude;
    $scope.userLng = position.coords.longitude;
    var geocoder = new google.maps.Geocoder();
    $scope.map = {
      center: {
        latitude: $scope.userLat,
        longitude: $scope.userLng
      },
      zoom: 12
    };
  });
  $scope.polygons = zonaDraw;

});





var zonaJag = [
  new google.maps.LatLng(19.423535,-99.144745),
  new google.maps.LatLng(19.436647,-99.150753),
  new google.maps.LatLng(19.451216,-99.142857),
  new google.maps.LatLng(19.449597,-99.122257),
  new google.maps.LatLng(19.429201,-99.115391),
  new google.maps.LatLng(19.420135,-99.102516),
  new google.maps.LatLng(19.455262,-99.089470),
  new google.maps.LatLng(19.474846,-99.113331),
  new google.maps.LatLng(19.490706,-99.150238),
  new google.maps.LatLng(19.472419,-99.159164),
  new google.maps.LatLng(19.451540,-99.163456),
  new google.maps.LatLng(19.439885,-99.183025),
  new google.maps.LatLng(19.418516,-99.167233),
  new google.maps.LatLng(19.406212,-99.134617),
  new google.maps.LatLng(19.387753,-99.132557),
  new google.maps.LatLng(19.394230,-99.116936),
  new google.maps.LatLng(19.407831,-99.118652),
  new google.maps.LatLng(19.417707,-99.137535)
];

var zonaDraw = [
        {
            id: 1,
            path: zonaJag,
            stroke: {
                color: '#F8012D',
                weight: 1
            },
            geodesic: false,
            visible: true,
            fill: {
                color: '#00B9FF',
                opacity: 0.8
            }
        }
    ];
