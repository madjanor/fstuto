(
  function () {
    "use strict";

    angular.module('public')
      .controller("UserInfoController", UserInfoController);

      UserInfoController.$inject=['currentUser', 'favoriteDish'];

      function UserInfoController(currentUser, favoriteDish){
        var ctrl = this;
        ctrl.user = currentUser;
        ctrl.dish = favoriteDish;
      }

  }
)();
