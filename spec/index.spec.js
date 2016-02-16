/* globals require */

/*!
 * Module dependencies.
 */

var cordova = require('./helper/cordova'),
    Template = require('../www/template'),
    execSpy,
    execWin,
    options;

/*!
 * Specification.
 */

describe('cordova-plugin-template', function () {
    beforeEach(function () {
        execWin = jasmine.createSpy();
        execSpy = spyOn(cordova.required, 'cordova/exec').andCallFake(execWin);
    });

    describe('Template', function () {
        it('should exist', function () {
            expect(Template).toBeDefined();
            expect(typeof Template === 'object').toBe(true);
        });

        it('should contain a echo function', function () {
            expect(Template.echo).toBeDefined();
            expect(typeof Template.echo === 'function').toBe(true);
        });
    });

    describe('Template instance', function () {
        describe('cordova.exec', function () {
            it('should call cordova.exec on next process tick', function (done) {
                Template.echo(function(data) {
                    expect(data).toEqual('my message');
                }, function() {}, 'my message', false);
                setTimeout(function () {
                    expect(execSpy).toHaveBeenCalledWith(
                        jasmine.any(Function),
                        jasmine.any(Function),
                        'Echo',
                        'echo',
                        jasmine.any(Object)
                    );
                    done();
                }, 100);
            });

            it('should call cordova.exec on next process tick async', function (done) {
                Template.echo(function(data) {
                    expect(data).toEqual('my message async');
                }, function() {}, 'my message async', true);
                setTimeout(function () {
                    expect(execSpy).toHaveBeenCalledWith(
                        jasmine.any(Function),
                        jasmine.any(Function),
                        'Echo',
                        'echoAsync',
                        jasmine.any(Object)
                    );
                    done();
                }, 100);
            });
        });
    });
});
