(function (angular) {
  'use strict';

  angular
    .module('ngTranscludeSlotTemplate', [])
    .directive('ngTranscludeSlotTemplate', ngTranscludeSlotTemplate);

  //////
  function ngTranscludeSlotTemplate() {
    return {
      restrict: 'E',
      scope: {
        directiveSource: '=',
        slotName: '@',
        locals: '=?'
      },
      link: function (scope, element) {
        if (angular.isUndefined(scope.directiveSource.$transclude) ||
          angular.isUndefined(scope.directiveSource.$scope)) {
          throw 'Directive needs $transclude and $scope variables from main directive where template slot was placed and attached as directiveSource attribute.';
        }

        var newScope = angular.extend(scope.directiveSource.$scope.$new(), scope.locals);

        scope.directiveSource.$transclude(newScope, function (tClone) {
          element.append(tClone);
        }, null, scope.slotName);
      }
    };
  }

})(angular);
