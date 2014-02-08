'use strict';

angular.module('tmntApp')
  .controller('MainCtrl', function ($scope, teams) {
    $scope.teams = teams;
  });
