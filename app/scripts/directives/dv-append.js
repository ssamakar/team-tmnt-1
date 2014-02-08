'use strict';

angular.module('tmntApp')
  .directive('dvAppend', function () {
    return {
      template: '<div>{{ awesomeText }} {{ appendedText }}</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.awesomeText = attrs.text;
        scope.appendedText = attrs.append;

      }
    };
  });
