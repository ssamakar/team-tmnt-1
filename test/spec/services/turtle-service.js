'use strict';

describe('Service: TurtleService', function () {

  // load the service's module
  beforeEach(module('tmntApp'));

  // instantiate service
  var TurtleService;
  beforeEach(inject(function (_TurtleService_) {
    TurtleService = _TurtleService_;
  }));

  it('should do something', function () {
    expect(!!TurtleService).toBe(true);
  });

});
