(function(){
  'use strict';
  var myapp = angular.module('LunchCheck', []);

  myapp.controller('LunchCheckController', LunchCheckController);

  function LunchCheckController($scope)
  {
    $scope.menuEntered ="";
    $scope.resultOfCheck ="";
    $scope.refreshCheckResult = function(){
      $scope.resultOfCheck = computeMsg($scope.menuEntered);
    };
  };

  LunchCheckController.$inject = ['$scope'];

  function computeMsg(inputStr)
  {
    var outputmsg="";
    if(inputStr.length < 1){
      outputmsg ="Please enter data first";
    }else
    {
      var arr = inputStr.split(',');
      if(arr.length <= 3){
        outputmsg = "Enjoy!";
      }else{
        outputmsg = "Too much!" ;
      }
    }
    return outputmsg;

  };

})();
