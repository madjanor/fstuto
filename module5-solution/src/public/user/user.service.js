(
  function(){
    "use strict";

    angular.module('common')
    .service('UserService', UserService);

    function UserService(){
      var storage = this;
      storage.user = null;
      storage.favoriteDish = null;

      storage.storeAll  = function(usr , dish){
        console.log("The user :" , usr);
        console.log("Then dish :" ,  dish);
        storage.user = usr;
        storage.favoriteDish = dish;
      }

      storage.getUser = function(){
        return storage.user ;
      }

      storage.getFavoriteDish = function(){
        return storage.favoriteDish ;
      }


    }

  }
)();
