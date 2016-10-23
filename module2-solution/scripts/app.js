(function(){
  "use strict";
  var myapp = angular.module('ShoppingListCheckOff', []);

  myapp.controller("ToBuyController",ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController);

  myapp.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  function ToBuyController(ShoppingListCheckOffService){
      var toByCtrl = this;

      toByCtrl.getItems = function(){
        return ShoppingListCheckOffService.getItemsToBuy();
      };

      toByCtrl.buyAction=function(indx){
        ShoppingListCheckOffService.buy(indx);
      };

      toByCtrl.isEmpty = function(){
        return ShoppingListCheckOffService.getItemsToBuy().length == 0;
      };
  };
  ToBuyController.$inject = ["ShoppingListCheckOffService"];

  function AlreadyBoughtController(ShoppingListCheckOffService){
      var boughtCtrl = this;

      boughtCtrl.getItems = function(){
        return  ShoppingListCheckOffService.getItemsBought();
      };
      boughtCtrl.isEmpty = function(){
        return ShoppingListCheckOffService.getItemsBought().length == 0;
      };
  };
  AlreadyBoughtController.$inject =["ShoppingListCheckOffService"];


  function ShoppingListCheckOffService(){
        var itemsToBuy = [
          { name: "cookies", quantity: 10 },
          { name: "chips", quantity: 5 },
          { name: "soda", quantity: 10 }
        ];
        var itemsBought = [];

        this.getItemsToBuy = function(){
          return itemsToBuy;
        }

        this.getItemsBought = function(){
          return itemsBought;
        }

        this.buy = function(indx){
          var elm = itemsToBuy[indx];
          itemsToBuy.splice(indx, 1) ;
          itemsBought.push(elm);
          console.log("bought : ",itemsBought );
          console.log("tobuy : ",itemsToBuy );
        }
  };

})();
