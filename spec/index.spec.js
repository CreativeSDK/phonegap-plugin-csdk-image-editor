/* globals require */

/*!
 * Module dependencies.
 */

var cordova = require('./helper/cordova'),
    ImageEditor = require('../www/ImageEditor'),
    execSpy,
    execWin,
    options;

/*!
 * Specification.
 */

describe('phonegap-plugin-csdk-image-editor', function () {
    beforeEach(function () {
        execWin = jasmine.createSpy();
        execSpy = spyOn(cordova.required, 'cordova/exec').andCallFake(execWin);
    });

    describe('Image Editor', function () {
        it('should exist', function () {
            expect(ImageEditor).toBeDefined();
            expect(typeof ImageEditor === 'object').toBe(true);
        });

        it('should contain a edit function', function () {
            expect(ImageEditor.edit).toBeDefined();
            expect(typeof ImageEditor.edit === 'function').toBe(true);
        });
    });

    /*
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
    */
});
