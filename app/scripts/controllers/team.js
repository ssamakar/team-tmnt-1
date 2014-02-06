'use strict';

angular.module('teamTmntApp')
  .controller('TeamCtrl', function ($scope, team) {
    $scope.team = team[0];
  });
