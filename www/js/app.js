// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'pascalprecht.translate'])

    //Default system function - Do not modify!
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

//----- Application code starts here -----------

    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
             function($stateProvider, $urlRouterProvider, $ionicConfigProvider){
          
        //Sets the tabs (if used) at the bottom of the page.         
         $ionicConfigProvider.tabs.position('bottom');
        //This section is where you define the templates for each page
        $stateProvider
            .state('welcome',{
                url:'/',
                templateUrl:'templates/welcome.html',
                controller:'welcomeCtrl',
                resolve:{
                    appInfo:['$http', function($http){
                        return $http.get('projectData/appInfo.json').then(function(response){return response.data})
                    }]
                }
            })
            .state('searchBy',{
                url:'/searchBy',
                templateUrl:'templates/searchBy.html',
                controller:'searchByCtrl',
                resolve:{
                    appInfo:['$http', function($http){
                        return $http.get('projectData/appInfo.json').then(function(response){return response.data})
                    }]
                }
            })
            .state('productList',{
                url:'/productList',
                templateUrl:'templates/productList.html',
                controller:'productListCtrl'
            })
        
            .state('productInfoMain',{
                url:'/productInfoMain/:productName',
                templateUrl:'templates/productInfoMain.html',
                controller:'productInfoMainCtrl'
            })
            
            .state('productInfoCredits',{
                url:'/productInfoCredits/:productName',
                templateUrl:'templates/productInfo-credits.html',
                controller:'productInfoCreditsCtrl'
            })
        
            .state('productInfoEngControl',{
                url:'/productInfoEngControl/:productName',
                templateUrl:'templates/productInfo-engControl.html',
                controller:'productInfoEngControlCtrl'
            })
        
            .state('productInfoFirstAid',{
                url:'/productInfoFirstAid/:productName',
                templateUrl:'templates/productInfo-firstAid.html',
                controller:'productInfoFirstAidCtrl'
            })
        
            .state('productInfoHealth',{
                url:'/productInfoHealth/:productName',
                templateUrl:'templates/productInfo-health.html',
                controller:'productInfoHealthCtrl'
            })
        
            .state('productInfoInfo',{
                url:'/productInfoInfo/:productName',
                templateUrl:'templates/productInfo-info.html',
                controller:'productInfoInfoCtrl'
            })
        
            .state('productInfoPPE',{
                url:'/productInfoPPE/:productName',
                templateUrl:'templates/productInfo-PPE.html',
                controller:'productInfoPPECtrl'
            })
        
            .state('pests',{
                url:'/pests',
                templateUrl:'templates/pests.html',
                controller:'pestsCtrl',
                resolve:{
                    pestInfo:['$http', function($http){
                        //Gets the app information from the json file.
                        return $http.get('projectData/pestInfo.json').then(function(response){return response.data})
                    }]
                }
            })
        
        //Sets the default URL if a user navigates to a non existing page.
        $urlRouterProvider.otherwise('/');
            
    }])//End of .config (states)
    .config(['$translateProvider',
            function($translateProvider){
                //Ads the EN and ES languages/ lables in to the translateProvider
                //Translations variable is from appLables.js file which is loaded in the index.html
                for(lang in translations){
		          $translateProvider.translations(lang, translations[lang]);
	            }
                //Setting the prefered and fall back language
                $translateProvider.preferredLanguage("en");
                $translateProvider.fallbackLanguage("en");
            }])

    //This controller loads the product list from the json files
    .controller('productListCtrl',['$scope', '$http', '$translate', 'productSevice',
      function($scope, $http, $translate, productSevice){
          $scope.ChangeLanguage = function(state){
                    if(state){
		              $translate.use('es');
                    }
                    else{
                      $translate.use('en');
                    }
	               }
          
          //gets the product list from the memory to populate the list on the page
          $scope.products=productSevice.getProductList();
          
          $scope.setCrProduct=function(cProd){
            //console.info(cProd); 
              productSevice.setCurrentProduct(cProd);
          }


      }]
    )//End of productListCtrl

    //Controller for the welcome screen
    .controller('welcomeCtrl',['$scope','$http', '$translate', 'appInfo', 'productSevice',
            function($scope, $http, $translate, appInfo, productSevice){
                //Gets the application details and stores it in the appInfo array.
                $scope.appInfo=appInfo;
                
                //Stores the product list in the device memory
                productSevice.setProductList();
                
                //Function to change language
                //This function is called when the change language button is clicked.
                $scope.ChangeLanguage = function(state){
                    if(state){
		              $translate.use('es');
                    }
                    else{
                      $translate.use('en');
                    }
	               }
            }])

     //Controller for the searchBy screen
    .controller('searchByCtrl',['$scope', '$http', '$translate', 'appInfo',
            function($scope, $http, $translate, appInfo){
                //Gets the app information from the json file.

                $scope.appInfo=appInfo;
                
                //Function to change language
                //This function is called when the change language button is clicked.
                $scope.ChangeLanguage = function(state){
                    if(state){
		              $translate.use('es');
                    }
                    else{
                      $translate.use('en');
                    }
	               }
            }])

//Controller for the searchBy screen
    .controller('productInfoMainCtrl',['$scope', '$http', '$translate', '$stateParams', '$ionicHistory',
            function($scope, $http, $translate, $stateParams, $ionicHistory){
                //Gets the app information from the json file.

                $scope.productName=$stateParams.productName;
                $scope.goBack=function(){
                    $ionicHistory.goBack();
                }
                //Function to change language
                //This function is called when the change language button is clicked.
                $scope.ChangeLanguage = function(state){
                    if(state){
		              $translate.use('es');
                    }
                    else{
                      $translate.use('en');
                    }
	               }
            }])

//Controller for pests screen
    .controller('pestsCtrl',['$scope', '$http', '$translate', 'pestInfo',
            function($scope, $http, $translate, pestInfo){

                $scope.pestInfo=pestInfo;
                $scope.sampleData=[];
                for(i=0; i<5; i++){
                    $scope.sampleData[i]=i;
                }
                
                //Function to change language
                //This function is called when the change language button is clicked.
                $scope.ChangeLanguage = function(state){
                    if(state){
		              $translate.use('es');
                    }
                    else{
                      $translate.use('en');
                    }
	               }
                 $scope.toggleGroup = function(group) {
                    if ($scope.isGroupShown(group)) {
                        $scope.shownGroup = null;
                    } else {
                      $scope.shownGroup = group;
                    }
                }
                $scope.isGroupShown = function(group) {
                    return $scope.shownGroup === group;
                }
            }])

//Controller for Credits page
    .controller('productInfoCreditsCtrl',['$scope', '$http', '$translate', '$stateParams', '$ionicHistory',
            function($scope, $http, $translate, $stateParams, $ionicHistory){
                //Gets the app information from the json file.

                $scope.productName=$stateParams.productName;
                $scope.goBack=function(){
                    $ionicHistory.goBack();
                }
                //Function to change language
                //This function is called when the change language button is clicked.
                $scope.ChangeLanguage = function(state){
                    if(state){
		              $translate.use('es');
                    }
                    else{
                      $translate.use('en');
                    }
	               }
            }])

//Controller for Engineering control page
    .controller('productInfoEngControlCtrl',['$scope', '$http', '$translate', '$stateParams', '$ionicHistory',
            function($scope, $http, $translate, $stateParams, $ionicHistory){
                //Gets the app information from the json file.

                $scope.productName=$stateParams.productName;
                $scope.goBack=function(){
                    $ionicHistory.goBack();
                }
                //Function to change language
                //This function is called when the change language button is clicked.
                $scope.ChangeLanguage = function(state){
                    if(state){
		              $translate.use('es');
                    }
                    else{
                      $translate.use('en');
                    }
	               }
            }])

//Controller for First Aid page
    .controller('productInfoFirstAidCtrl',['$scope', '$http', '$translate', '$stateParams', '$ionicHistory',
            function($scope, $http, $translate, $stateParams, $ionicHistory){
                //Gets the app information from the json file.

                $scope.productName=$stateParams.productName;
                $scope.goBack=function(){
                    $ionicHistory.goBack();
                }
                //Function to change language
                //This function is called when the change language button is clicked.
                $scope.ChangeLanguage = function(state){
                    if(state){
		              $translate.use('es');
                    }
                    else{
                      $translate.use('en');
                    }
	               }
            }])

//Controller for Health page
    .controller('productInfoHealthCtrl',['$scope', '$http', '$translate', '$stateParams', '$ionicHistory',
            function($scope, $http, $translate, $stateParams, $ionicHistory){
                //Gets the app information from the json file.

                $scope.productName=$stateParams.productName;
                $scope.goBack=function(){
                    $ionicHistory.goBack();
                }
                //Function to change language
                //This function is called when the change language button is clicked.
                $scope.ChangeLanguage = function(state){
                    if(state){
		              $translate.use('es');
                    }
                    else{
                      $translate.use('en');
                    }
	               }
            }])

//Controller for Product info page
    .controller('productInfoInfoCtrl',['$scope', '$translate', '$stateParams', '$ionicHistory', 'productSevice',
            function($scope, $translate, $stateParams, $ionicHistory, productSevice){
                //Gets the app information from the json file.

                //$scope.productName=$stateParams.productName;
                $scope.productInfo=productSevice.getCurrentProduct();
                //console.info(JSON.stringify($scope.productInfo));
                $scope.goBack=function(){
                    $ionicHistory.goBack();
                }
                //Function to change language
                //This function is called when the change language button is clicked.
                $scope.ChangeLanguage = function(state){
                    if(state){
		              $translate.use('es');
                    }
                    else{
                      $translate.use('en');
                    }
	               }
            }])

//Controller for PPE page
    .controller('productInfoPPECtrl',['$scope', '$http', '$translate', '$stateParams', '$ionicHistory',
            function($scope, $http, $translate, $stateParams, $ionicHistory){
                //Gets the app information from the json file.

                $scope.productName=$stateParams.productName;
                $scope.goBack=function(){
                    $ionicHistory.goBack();
                }
                //Function to change language
                //This function is called when the change language button is clicked.
                $scope.ChangeLanguage = function(state){
                    if(state){
		              $translate.use('es');
                    }
                    else{
                      $translate.use('en');
                    }
	               }
            }])

//------ Services section --------------
.factory('productSevice',['$http', '$localstorage', function($http, $localstorage){
    var product = [];
    
	return {
        //Stores the product list in the memory when the app starts
        setProductList: function(){
            $http.get('projectData/productList.json').success(function(data){
                console.error('setting data: inside setProductList');
                $localstorage.setObject('productList', data);
            })
        },
        
        //Gets the product list from the memory by calling the localstorage service
        getProductList:function(){
            return $localstorage.getObject('productList');  
        },
        
		setCurrentProduct: function(productName){
            var fileName='';
            //console.log(productName);
            var productList= $localstorage.getObject('productList');
            
            //gets the file path of the product where the information is stored
            for(var i=0; i<productList.length; i++){
                if(productList[i].productName==productName){
                       fileName=productList[i].fileName;
                       break;
                   }
            }
            //console.log(fileName);
            
            $http.get('projectData/DBFiles/'+fileName).success(function(results){
                //console.log(JSON.stringify(results));
                $localstorage.setObject('currentProduct',results);
            }).error(function(data){
                console.error('There was an error reading json file: setCurrentProduct');
            })
		},
        
        getCurrentProduct:function(){
            return $localstorage.getObject('currentProduct');   
        }
	}
}])

//Service for setting and getting values from the local storage
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);