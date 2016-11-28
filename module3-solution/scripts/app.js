(function(){
  "use strict";
  var myapp = angular.module('NarrowItDownApp', []);

  myapp.controller('NarrowItDownController', NarrowItDownController)
       .service('MenuSearchService', MenuSearchService)
       .directive('foundItems', FoundItemsDirectiveFactory);

  function NarrowItDownController(MenuSearchService){
      var ctrl = this;
      ctrl.found =[];
      ctrl.searchTerm ="";
      ctrl.message ="";

      ctrl.narrowItAction = function(){
        var prom = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm );
        prom.then(function(result){
          console.log("Success case ", result);
          ctrl.found=result;
          if(ctrl.found.length <= 1) ctrl.message= "Nothing found";
          else ctrl.message= "";
        },

          function(failure){
            console.log("failure case ", failure);
            this.message= "Nothing found";
          });
      }

      ctrl.removeAction = function(ind){
        ctrl.found.splice(ind, 1);
      }

  };
  NarrowItDownController.$inject =['MenuSearchService'];

  function MenuSearchService($q, $http){
    var menuItemUrl = "https://davids-restaurant.herokuapp.com/menu_items.json";

    this.getMatchedMenuItems = function(searchTerm){

      return $http({url:menuItemUrl})
      .then(function (result) {
        // process result and only keep items that match
        console.log("http call result", result);
        var jsonData = result.data;
        var foundItems = [];
        if(searchTerm != null && searchTerm.length >0){

          var menus = jsonData.menu_items;
          for(var i=0; i< menus.length; i++){
            var menu = menus[i];
            if(menu.description.indexOf(searchTerm)>-1) {
              foundItems.push(menu);
            }
          }
        }

        // return processed items
        return foundItems;
      });

    };
  };

  MenuSearchService.$inject =['$q', '$http'];


  function FoundItemsDirectiveFactory(){
    var ddo={
      templateUrl:"templates/found-items.html",
      scope :{
        dirFound :"<",
        onRemove :"&",
        msg :"<"
      },
      restrict : 'E'

    };
    return ddo;
  }

})();
