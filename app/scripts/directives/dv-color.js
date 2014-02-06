'use strict';

angular.module('tmntApp')
  .directive('dvColor', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.css('color', attrs.dvColor);
      }
    };
  });
