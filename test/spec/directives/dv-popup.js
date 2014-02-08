'use strict';

describe('Directive: dvPopup', function () {

  // load the directive's module
  beforeEach(module('tmntApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dv-popup></dv-popup>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dvPopup directive');
  }));
});
