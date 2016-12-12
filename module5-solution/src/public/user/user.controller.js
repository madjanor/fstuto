(
  function(){
  "use strict";

  angular.module('public')
    .controller("UserController", UserController);

    UserController.$inject=['MenuService', 'UserService'];
    function UserController(MenuService, UserService){
      var ctrl = this;
      ctrl.user ={};

      ctrl.favoriteDish = null;
      ctrl.dishCheckMsg ="";
      ctrl.saveMsg ="";

      ctrl.register = function (){
        var df = MenuService.getSingleMenuItem(ctrl.user.dish);
        df.then(function(result){
          ctrl.favoriteDish = result.data;
          ctrl.dishCheckMsg ="";
          ctrl.saveMsg ="Your information has been saved";
          UserService.storeAll(ctrl.user, ctrl.favoriteDish);
        }, function(error){
          console.warn("Unable to find the  menu");
           ctrl.dishCheckMsg ="No such menu number exists";
           ctrl.saveMsg="";
           ctrl.favoriteDish=null;
           UserService.storeAll(ctrl.user, ctrl.favoriteDish);
        });



      }

    }
    ;
})();
