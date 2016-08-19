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

        describe('Output Size', function() {
            it('should contain a getOutputSize function', function () {
                expect(CSDKImageEditor.getOutputSize).toBeDefined();
                expect(typeof CSDKImageEditor.getOutputSize === 'function').toBe(true);
            });

            it('should be valid', function() {
                expect(CSDKImageEditor.getOutputSize(0)).toBe(0);
                expect(CSDKImageEditor.getOutputSize(1)).toBe(1);
                expect(CSDKImageEditor.getOutputSize(15)).toBe(15);
                expect(CSDKImageEditor.getOutputSize(30)).toBe(30);
            });

            it('should convert invalid values to 0', function() {
                expect(CSDKImageEditor.getOutputSize()).toBe(0);
                expect(CSDKImageEditor.getOutputSize(null)).toBe(0);
                expect(CSDKImageEditor.getOutputSize(undefined)).toBe(0);
                expect(CSDKImageEditor.getOutputSize(-1)).toBe(0);
                expect(CSDKImageEditor.getOutputSize(-10)).toBe(0);
                expect(CSDKImageEditor.getOutputSize(31)).toBe(0);
                expect(CSDKImageEditor.getOutputSize(457)).toBe(0);
            });
        });

        describe('Preview Size', function() {
            it('should contain a getPreviewSize function', function () {
                expect(CSDKImageEditor.getPreviewSize).toBeDefined();
                expect(typeof CSDKImageEditor.getPreviewSize === 'function').toBe(true);
            });

            it('should be valid', function() {
                expect(CSDKImageEditor.getPreviewSize(1)).toBe(1);
                expect(CSDKImageEditor.getPreviewSize(15)).toBe(15);
                expect(CSDKImageEditor.getPreviewSize(30)).toBe(30);
            });

            it('should convert invalid values to 0', function() {
                expect(CSDKImageEditor.getPreviewSize()).toBe(0);
                expect(CSDKImageEditor.getPreviewSize(null)).toBe(0);
                expect(CSDKImageEditor.getPreviewSize(undefined)).toBe(0);
                expect(CSDKImageEditor.getPreviewSize(-1)).toBe(0);
                expect(CSDKImageEditor.getPreviewSize(-10)).toBe(0);
            });
        });


        describe('Output File', function() {
            it('should contain a getOutputFile function', function () {
                expect(CSDKImageEditor.getOutputFile).toBeDefined();
                expect(typeof CSDKImageEditor.getOutputFile === 'function').toBe(true);
            });

            it('should be valid', function() {
                expect(CSDKImageEditor.getOutputFile('/data/data/ack.jpg')).toBe('/data/data/ack.jpg');
                expect(CSDKImageEditor.getOutputFile('file:///data/data/ack.jpg')).toBe('/data/data/ack.jpg');
            });

            it('should convert invalid values to empty string', function() {
                expect(CSDKImageEditor.getOutputFile()).toBe('');
                expect(CSDKImageEditor.getOutputFile('')).toBe('');
                expect(CSDKImageEditor.getOutputFile(null)).toBe('');
                expect(CSDKImageEditor.getOutputFile(undefined)).toBe('');
            });
        });

        describe('Orientation Type', function() {
            it('should contain the OrientationType constants', function () {
                expect(CSDKImageEditor.OrientationType.PORTRAIT).toBe(1);
                expect(CSDKImageEditor.OrientationType.PORTRAIT_UPSIDE_DOWN).toBe(2);
                expect(CSDKImageEditor.OrientationType.LANDSCAPE_RIGHT).toBe(3);
                expect(CSDKImageEditor.OrientationType.LANDSCAPE_LEFT).toBe(4);
            });
        });

        describe('Left Button Type', function() {
            it('should contain the LeftButtonType constants', function () {
                expect(CSDKImageEditor.LeftButtonType.CANCEL).toBe(0);
                expect(CSDKImageEditor.LeftButtonType.BACK).toBe(1);
                expect(CSDKImageEditor.LeftButtonType.EXIT).toBe(2);
            });
        });

        describe('Right Button Type', function() {
            it('should contain the RightButtonType constants', function () {
                expect(CSDKImageEditor.RightButtonType.DONE).toBe(0);
                expect(CSDKImageEditor.RightButtonType.SAVE).toBe(1);
                expect(CSDKImageEditor.RightButtonType.NEXT).toBe(2);
                expect(CSDKImageEditor.RightButtonType.SEND).toBe(3);
            });
        });
    });
});
