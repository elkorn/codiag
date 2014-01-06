'use strict';

describe('Service: Userroomservice', function () {

  // load the service's module
  beforeEach(module('codiagApp'));

  // instantiate service
  var Userroomservice;
  beforeEach(inject(function (_Userroomservice_) {
    Userroomservice = _Userroomservice_;
  }));

  it('should do something', function () {
    expect(!!Userroomservice).toBe(true);
  });

});
