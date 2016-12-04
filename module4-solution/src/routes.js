(function () {


angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      template: '<a ui-sref="categories">Discover our categories</a>'
    })

    .state('categories', {
      url: '/categories',
      template: '<categories category-data-array="ctrl.categoriesResolved"></categories>',

      resolve : {
        categoriesResolved : ['MenuDataService', function(MenuDataService){
          return MenuDataService.getAllCategories();
        }]
      },
      controller: function(categoriesResolved){
        //console.log("Setting The resolved array ", categoriesResolved );
        this.categoriesResolved = categoriesResolved;
      },
      controllerAs: 'ctrl'

    })

    .state('items', {
      url: '/items/{shortname}',
      template: '<items item-data-array="ctrlIt.itemsResolved"></items>',

      resolve : {

        itemsResolved : ['$stateParams','MenuDataService', function($stateParams,MenuDataService){
          console.log("category retrieved from http param", $stateParams);
          var param = $stateParams.shortname;
          console.log("category retrieved from http param", param);

          return MenuDataService.getItemsForCategory(param);
        }]
      }
      ,
      controller: function(itemsResolved){
        console.log("Setting The resolved array ", itemsResolved );
        this.itemsResolved = itemsResolved;
      },
      controllerAs: 'ctrlIt'

    });
}


})();
