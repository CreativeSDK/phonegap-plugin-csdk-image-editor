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

        describe('Tools', function() {
            it('should contain a getTools function', function () {
                expect(ImageEditor.getTools).toBeDefined();
                expect(typeof ImageEditor.getTools === 'function').toBe(true);
            });

            it('should contain the ToolType constants', function () {
                expect(ImageEditor.ToolType.SHARPNESS).toBe(0);
                expect(ImageEditor.ToolType.EFFECTS).toBe(1);
                expect(ImageEditor.ToolType.REDEYE).toBe(2);
                expect(ImageEditor.ToolType.CROP).toBe(3);
                expect(ImageEditor.ToolType.WHITEN).toBe(4);
                expect(ImageEditor.ToolType.DRAW).toBe(5);
                expect(ImageEditor.ToolType.STICKERS).toBe(6);
                expect(ImageEditor.ToolType.TEXT).toBe(7);
                expect(ImageEditor.ToolType.BLEMISH).toBe(8);
                expect(ImageEditor.ToolType.MEME).toBe(9);
                expect(ImageEditor.ToolType.ORIENTATION).toBe(10);
                expect(ImageEditor.ToolType.ENHANCE).toBe(11);
                expect(ImageEditor.ToolType.FRAMES).toBe(12);
                expect(ImageEditor.ToolType.SPLASH).toBe(13);
                expect(ImageEditor.ToolType.FOCUS).toBe(14);
                expect(ImageEditor.ToolType.BLUR).toBe(15);
                expect(ImageEditor.ToolType.VIGNETTE).toBe(16);
                expect(ImageEditor.ToolType.LIGHTING).toBe(17);
                expect(ImageEditor.ToolType.COLOR).toBe(18);
                expect(ImageEditor.ToolType.OVERLAYS).toBe(19);
                expect(ImageEditor.ToolType.ADJUST).toBe(20);
            });

            it('empty array should be valid', function() {
                expect(ImageEditor.getTools([]).length).toBe(0);
            });

            it('should be valid', function() {
                expect(ImageEditor.getTools([ImageEditor.ToolType.SHARPNESS]).length).toBe(1);
                expect(ImageEditor.getTools([ImageEditor.ToolType.SHARPNESS, ImageEditor.ToolType.LIGHTING]).length).toBe(2);
            });

            it('should remove invalid values', function() {
                expect(ImageEditor.getTools([-1]).length).toBe(0);
                expect(ImageEditor.getTools([21]).length).toBe(0);
                expect(ImageEditor.getTools([ImageEditor.ToolType.SHARPNESS, 42, ImageEditor.ToolType.LIGHTING]).length).toBe(2);
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
