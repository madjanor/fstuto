(function(){
  "use strict";

  var dataModule = angular.module('data');
  dataModule.constant('menuBaseUrl',  'https://davids-restaurant.herokuapp.com/')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject =['menuBaseUrl', '$q', '$http'];
  function MenuDataService(menuBaseUrl, $q, $http){

    var menuDataSvc = this;

    menuDataSvc.getAllCategories = function(){
      var catUrl = menuBaseUrl+"categories.json";
      return $http({url:catUrl})
          .then(function (result) {
            var jsonData = result.data;
          //  console.log("retrieved categories", jsonData);
            return jsonData;
          });

    };

    menuDataSvc.getItemsForCategory =  function(categoryShortName){
      var menuDataSvc = this;
      var itemUrl = menuBaseUrl+"menu_items.json";

      return $http({url:itemUrl, params:{category:categoryShortName}})
          .then(function (result) {
            var jsonData = result.data;
            console.log("Menus for ",categoryShortName, "are :" , jsonData);
            return jsonData.menu_items;
          });
    };

  };
})();
