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

        describe('Output Type', function() {
            it('should contain a getOutputType function', function () {
                expect(ImageEditor.getOutputType).toBeDefined();
                expect(typeof ImageEditor.getOutputType === 'function').toBe(true);
            });

            it('should contain two OutputType constants', function () {
                expect(ImageEditor.OutputType.JPEG).toBe(0);
                expect(ImageEditor.OutputType.PNG).toBe(1);
            });

            it('should return correct output type', function () {
                expect(ImageEditor.getOutputType('file.jpg')).toBe(ImageEditor.OutputType.JPEG);
                expect(ImageEditor.getOutputType('file.jpeg')).toBe(ImageEditor.OutputType.JPEG);
                expect(ImageEditor.getOutputType('file.JPG')).toBe(ImageEditor.OutputType.JPEG);
                expect(ImageEditor.getOutputType('file.JPEG')).toBe(ImageEditor.OutputType.JPEG);

                expect(ImageEditor.getOutputType('file.png')).toBe(ImageEditor.OutputType.PNG);
                expect(ImageEditor.getOutputType('file.PNG')).toBe(ImageEditor.OutputType.PNG);

                expect(ImageEditor.getOutputType('file.jpg', ImageEditor.OutputType.JPEG))
                    .toBe(ImageEditor.OutputType.JPEG);
                expect(ImageEditor.getOutputType('file.jpeg', ImageEditor.OutputType.JPEG))
                    .toBe(ImageEditor.OutputType.JPEG);
                expect(ImageEditor.getOutputType('file.JPG', ImageEditor.OutputType.JPEG))
                    .toBe(ImageEditor.OutputType.JPEG);
                expect(ImageEditor.getOutputType('file.JPEG', ImageEditor.OutputType.JPEG))
                    .toBe(ImageEditor.OutputType.JPEG);

                expect(ImageEditor.getOutputType('file.png', ImageEditor.OutputType.PNG))
                    .toBe(ImageEditor.OutputType.PNG);
                expect(ImageEditor.getOutputType('file.PNG', ImageEditor.OutputType.PNG))
                    .toBe(ImageEditor.OutputType.PNG);


                expect(ImageEditor.getOutputType('file.jpg', ImageEditor.OutputType.PNG))
                    .toBe(ImageEditor.OutputType.PNG);
                expect(ImageEditor.getOutputType('file.jpeg', ImageEditor.OutputType.PNG))
                    .toBe(ImageEditor.OutputType.PNG);
                expect(ImageEditor.getOutputType('file.JPG', ImageEditor.OutputType.PNG))
                    .toBe(ImageEditor.OutputType.PNG);
                expect(ImageEditor.getOutputType('file.JPEG', ImageEditor.OutputType.PNG))
                    .toBe(ImageEditor.OutputType.PNG);

                expect(ImageEditor.getOutputType('file.png', ImageEditor.OutputType.JPEG))
                    .toBe(ImageEditor.OutputType.JPEG);
                expect(ImageEditor.getOutputType('file.PNG', ImageEditor.OutputType.JPEG))
                    .toBe(ImageEditor.OutputType.JPEG);
            });

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
