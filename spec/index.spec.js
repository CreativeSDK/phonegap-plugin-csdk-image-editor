/* globals require */

/*!
 * Module dependencies.
 */

var cordova = require('./helper/cordova'),
    CSDKImageEditor = require('../www/ImageEditor'),
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
            expect(CSDKImageEditor).toBeDefined();
            expect(typeof CSDKImageEditor === 'object').toBe(true);
        });

        it('should contain a edit function', function () {
            expect(CSDKImageEditor.edit).toBeDefined();
            expect(typeof CSDKImageEditor.edit === 'function').toBe(true);
        });

        describe('Output Type', function() {
            it('should contain a getOutputType function', function () {
                expect(CSDKImageEditor.getOutputType).toBeDefined();
                expect(typeof CSDKImageEditor.getOutputType === 'function').toBe(true);
            });

            it('should contain two OutputType constants', function () {
                expect(CSDKImageEditor.OutputType.JPEG).toBe(0);
                expect(CSDKImageEditor.OutputType.PNG).toBe(1);
            });

            it('should return correct output type', function () {
                expect(CSDKImageEditor.getOutputType('file.jpg')).toBe(CSDKImageEditor.OutputType.JPEG);
                expect(CSDKImageEditor.getOutputType('file.jpeg')).toBe(CSDKImageEditor.OutputType.JPEG);
                expect(CSDKImageEditor.getOutputType('file.JPG')).toBe(CSDKImageEditor.OutputType.JPEG);
                expect(CSDKImageEditor.getOutputType('file.JPEG')).toBe(CSDKImageEditor.OutputType.JPEG);

                expect(CSDKImageEditor.getOutputType('file.png')).toBe(CSDKImageEditor.OutputType.PNG);
                expect(CSDKImageEditor.getOutputType('file.PNG')).toBe(CSDKImageEditor.OutputType.PNG);

                expect(CSDKImageEditor.getOutputType('file.jpg', CSDKImageEditor.OutputType.JPEG))
                    .toBe(CSDKImageEditor.OutputType.JPEG);
                expect(CSDKImageEditor.getOutputType('file.jpeg', CSDKImageEditor.OutputType.JPEG))
                    .toBe(CSDKImageEditor.OutputType.JPEG);
                expect(CSDKImageEditor.getOutputType('file.JPG', CSDKImageEditor.OutputType.JPEG))
                    .toBe(CSDKImageEditor.OutputType.JPEG);
                expect(CSDKImageEditor.getOutputType('file.JPEG', CSDKImageEditor.OutputType.JPEG))
                    .toBe(CSDKImageEditor.OutputType.JPEG);

                expect(CSDKImageEditor.getOutputType('file.png', CSDKImageEditor.OutputType.PNG))
                    .toBe(CSDKImageEditor.OutputType.PNG);
                expect(CSDKImageEditor.getOutputType('file.PNG', CSDKImageEditor.OutputType.PNG))
                    .toBe(CSDKImageEditor.OutputType.PNG);

                expect(CSDKImageEditor.getOutputType('file.jpg', CSDKImageEditor.OutputType.PNG))
                    .toBe(CSDKImageEditor.OutputType.PNG);
                expect(CSDKImageEditor.getOutputType('file.jpeg', CSDKImageEditor.OutputType.PNG))
                    .toBe(CSDKImageEditor.OutputType.PNG);
                expect(CSDKImageEditor.getOutputType('file.JPG', CSDKImageEditor.OutputType.PNG))
                    .toBe(CSDKImageEditor.OutputType.PNG);
                expect(CSDKImageEditor.getOutputType('file.JPEG', CSDKImageEditor.OutputType.PNG))
                    .toBe(CSDKImageEditor.OutputType.PNG);

                expect(CSDKImageEditor.getOutputType('file.png', CSDKImageEditor.OutputType.JPEG))
                    .toBe(CSDKImageEditor.OutputType.JPEG);
                expect(CSDKImageEditor.getOutputType('file.PNG', CSDKImageEditor.OutputType.JPEG))
                    .toBe(CSDKImageEditor.OutputType.JPEG);
            });
        });

        describe('Tools', function() {
            it('should contain a getTools function', function () {
                expect(CSDKImageEditor.getTools).toBeDefined();
                expect(typeof CSDKImageEditor.getTools === 'function').toBe(true);
            });

            it('should contain the ToolType constants', function () {
                expect(CSDKImageEditor.ToolType.SHARPNESS).toBe(0);
                expect(CSDKImageEditor.ToolType.EFFECTS).toBe(1);
                expect(CSDKImageEditor.ToolType.REDEYE).toBe(2);
                expect(CSDKImageEditor.ToolType.CROP).toBe(3);
                expect(CSDKImageEditor.ToolType.WHITEN).toBe(4);
                expect(CSDKImageEditor.ToolType.DRAW).toBe(5);
                expect(CSDKImageEditor.ToolType.STICKERS).toBe(6);
                expect(CSDKImageEditor.ToolType.TEXT).toBe(7);
                expect(CSDKImageEditor.ToolType.BLEMISH).toBe(8);
                expect(CSDKImageEditor.ToolType.MEME).toBe(9);
                expect(CSDKImageEditor.ToolType.ORIENTATION).toBe(10);
                expect(CSDKImageEditor.ToolType.ENHANCE).toBe(11);
                expect(CSDKImageEditor.ToolType.FRAMES).toBe(12);
                expect(CSDKImageEditor.ToolType.SPLASH).toBe(13);
                expect(CSDKImageEditor.ToolType.FOCUS).toBe(14);
                expect(CSDKImageEditor.ToolType.BLUR).toBe(15);
                expect(CSDKImageEditor.ToolType.VIGNETTE).toBe(16);
                expect(CSDKImageEditor.ToolType.LIGHTING).toBe(17);
                expect(CSDKImageEditor.ToolType.COLOR).toBe(18);
                expect(CSDKImageEditor.ToolType.OVERLAYS).toBe(19);
                expect(CSDKImageEditor.ToolType.ADJUST).toBe(20);
            });

            it('empty array should be valid', function() {
                expect(CSDKImageEditor.getTools([]).length).toBe(0);
            });

            it('should be valid', function() {
                expect(CSDKImageEditor.getTools([CSDKImageEditor.ToolType.SHARPNESS]).length).toBe(1);
                expect(CSDKImageEditor.getTools([CSDKImageEditor.ToolType.SHARPNESS, CSDKImageEditor.ToolType.LIGHTING]).length).toBe(2);
            });

            it('should remove invalid values', function() {
                expect(CSDKImageEditor.getTools([-1]).length).toBe(0);
                expect(CSDKImageEditor.getTools([21]).length).toBe(0);
                expect(CSDKImageEditor.getTools([CSDKImageEditor.ToolType.SHARPNESS, 42, CSDKImageEditor.ToolType.LIGHTING]).length).toBe(2);
            });
        });
    });
});
