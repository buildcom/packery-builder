/*

PACKERY BUILDER 
by Seth Davis (Web Designer & Front End Developer in Training)

App Modules:
UI Grid http://ui-grid.info/
- Edit Row Functionality: http://ui-grid.info/docs/#/tutorial/311_importing_data_with_rowedit

*/

angular.module('packery-builder', ['ui.grid', 'ui.grid.edit', 'ui.grid.importer'])

// Turn off Angular debug info / comments / extra css classes
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
  $compileProvider.commentDirectivesEnabled(false);
  $compileProvider.cssClassDirectivesEnabled(false);
}])

.directive('packery', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        
      console.log("link called on", element[0]);
        
      if ($rootScope.packery === undefined || $rootScope.packery === null) {
        scope.element = element;

        $rootScope.packery = new Packery(element[0].parentElement, {
          // isResizeBound: true,
          itemSelector: '.item'
        });
        
        $rootScope.packery.bindResize();

        var orderItems = function() {
          var itemElems = $rootScope.packery.getItemElements();
        };

        $rootScope.packery.on('layoutComplete', orderItems);
      }
        
      $timeout(function() {
        $rootScope.packery.reloadItems();
        $rootScope.packery.layout();
      }, 100);

    }
  };
}])

.controller('PackeryCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {

  // Stores CSV data in array of objects
  $scope.csvData = [];
  $scope.csvHasLoaded = false;

  $scope.gridOptions = {
    enableGridMenu: true,
    data: 'csvData',
    importerDataAddCallback: function (grid, newObjects) {
      $scope.csvData = $scope.csvData.concat(newObjects);
      console.log($scope.csvData);
      $scope.csvHasLoaded = !$scope.csvHasLoaded;
    },
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
    }
  };
}]);