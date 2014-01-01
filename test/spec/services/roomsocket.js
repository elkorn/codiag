'use strict';

describe('Service: roomSocket', function () {

  // load the service's module
  beforeEach(module('codiagApp'));

  // instantiate service
  var roomSocket;
  beforeEach(inject(function (_roomSocket_) {
    roomSocket = _roomSocket_;
  }));

  it('should do something', function () {
    expect(!!roomSocket).toBe(true);
  });

});
