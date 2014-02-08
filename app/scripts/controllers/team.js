'use strict';

angular.module('tmntApp')
  .controller('TeamCtrl', function ($scope, team) {
    $scope.team = team;
  });
