/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/* global cordova:false */
/* globals window */

var argscheck = cordova.require('cordova/argscheck'),
    exec = cordova.require('cordova/exec'),
    utils = cordova.require('cordova/utils');

/**
    @description A global object that lets you interact with the Creative SDK Image Editor.
    @global
*/
var CSDKImageEditor = {
    /**
     * @description Launches the Image Editor.
     * @function edit
     * @memberof CSDKImageEditor
     * @param {!successCallback} successCallback - See type definition.
     * @param {!errorCallback} errorCallback - See type definition.
     * @param {!string} imageUrl URL of the image to be edited.
     * @param {?Options} options An object containing optional property/value pairs.
     */
    edit: function(successCallback, errorCallback, imageUrl, options) {
        var getValue = argscheck.getValue;
        options = options || {};

        var outputType = CSDKImageEditor.getOutputType(imageUrl, options.outputType);
        var tools = CSDKImageEditor.getTools(options.tools);
        var quality = getValue(options.quality, 100);
        var confirmExit = getValue(options.confirmExit, false);
        var outputSize = CSDKImageEditor.getOutputSize(options.outputSize);
        var saveWithNoChanges = getValue(options.saveWithNoChanges, true);
        var vibrate = getValue(options.vibrate, false);
        var color = getValue(options.color, 0);
        var previewSize = getValue(options.previewSize, 0);
        var outputFile = CSDKImageEditor.getOutputFile(options.outputFile);

        // crop options for iOS
        if (!options.crop) {
            options.crop = {};
        }
        var cropCustom = getValue(options.crop.custom, true);
        var cropInvert = getValue(options.crop.invert, true);
        var cropOriginal = getValue(options.crop.original, true);
        var customArray = getValue(options.crop.customArray, []);

        var orientations = getValue(options.orientations, [CSDKImageEditor.OrientationType.PORTRAIT]);

        // button options
        if (!options.buttons) {
            options.buttons = {};
        }
        var leftButton = getValue(options.buttons.left, CSDKImageEditor.LeftButtonType.CANCEL);
        var rightButton = getValue(options.buttons.right, CSDKImageEditor.RightButtonType.DONE);

        var args = [imageUrl, outputType, tools, quality, confirmExit, outputSize,
            saveWithNoChanges, vibrate, color, previewSize, outputFile, cropCustom,
            cropInvert, cropOriginal, customArray, orientations, leftButton, rightButton
        ];

        exec(successCallback, errorCallback, 'CSDKImageEditor', 'edit', args);
    },
    /** @private */
    getOutputType: function(imageUrl, outputType) {
        if (outputType !== null && outputType !== 'undefined' &&
            (outputType === CSDKImageEditor.OutputType.JPEG || outputType === CSDKImageEditor.OutputType.PNG)) {
            return outputType;
        } else {
            if (imageUrl.toLowerCase().endsWith('png')) {
                return CSDKImageEditor.OutputType.PNG;
            } else {
                return CSDKImageEditor.OutputType.JPEG;
            }
         }
    },
    /** @private */
    getTools: function(tools) {
        var validTools = [];
        if (tools) {
            for(var i=0; i<tools.length; i++) {
                if (tools[i] >= 0 && tools[i] <= 20) {
                    validTools.push(tools[i]);
                }
            }
        }
        return validTools;
    },
    /** @private */
    getOutputSize: function(size) {
        if (!size || size < 0 || size > 30) {
            return 0;
        }
        return size;
    },
    /** @private */
    getPreviewSize: function(size) {
        if (!size || size < 0) {
            return 0;
        }
        return size;
    },
    /** @private */
    getOutputFile: function(file) {
        if (!file) {
            return '';
        } else if (file.startsWith('file://')) {
            file = file.substr(7);
        }
        return file;
    },
    /**
     * @readonly
     * @enum {number}
     */
    OutputType:{
        /** Return JPEG encoded image */
        JPEG: 0,
        /** Return PNG encoded image */
        PNG: 1
    },
    /**
     * @readonly
     * @enum {number}
     */
    ToolType:{
        SHARPNESS: 0,
        EFFECTS: 1,
        REDEYE: 2,
        CROP: 3,
        WHITEN: 4,
        DRAW: 5,
        STICKERS: 6,
        TEXT: 7,
        BLEMISH: 8,
        MEME: 9,
        ORIENTATION: 10,
        ENHANCE: 11,
        FRAMES: 12,
        SPLASH: 13,
        FOCUS: 14,
        BLUR: 15,
        VIGNETTE: 16,
        LIGHTING: 17,
        COLOR: 18,
        OVERLAYS: 19,
        ADJUST: 20
    },
    /**
     * @readonly
     * @enum {number}
     */
    OrientationType:{
        PORTRAIT: 1,
        PORTRAIT_UPSIDE_DOWN: 2,
        LANDSCAPE_RIGHT: 3,
        LANDSCAPE_LEFT: 4
    },
    /**
     * @readonly
     * @enum {number}
     */
    LeftButtonType:{
        CANCEL: 0,
        BACK: 1,
        EXIT: 2
    },
    /**
     * @readonly
     * @enum {number}
     */
    RightButtonType:{
        DONE: 0,
        SAVE: 1,
        NEXT: 2,
        SEND: 3
    }
};

/**
 * @description A callback to be used upon successful editing of an image.
 *
 * @callback successCallback
 * @param {string} newUrl - The URL of the new edited image.
 */

/**
 * @description A callback to handle errors when attempting to edit an image.
 *
 * @callback errorCallback
 * @param {Object} error - Error object.
 */

/**
 * @typedef {Object} Options - An object for configuring Image Editor behavior.
 * @property {CSDKImageEditor.OutputType} [outputType=Same as original image] - Forces a specific output type. Ex: `CSDKImageEditor.OutputType.JPEG`.
 * @property {CSDKImageEditor.ToolType[]} [tools=All tools] - Sets the list of tools that are available to the user, in the order you provide them within the array. Ex: `[CSDKImageEditor.Tooltype.CROP]`.
 * @property {number} [quality=100] - Sets the quality of the output of the image. This setting only affects `OutputType.JPEG` images. Valid values are `1` to `100`, inclusive.
 * @property {boolean} [confirmExit=false] - **[Android only]** Sets whether or not to confirm exiting the image editor when the user clicks done.
 * @property {number} [outputSize=0] - **[Android only]** Sets the size of the output image in mega pixels. Valid values are `0` to `30`, inclusive. Where `0` is the size of the preview image.
 * @property {boolean} [saveWithNoChanges=true] - **[Android only]** When `true` the success callback will be invoked even when the user does not make any changes to the image. If `false` the error callback will be invoked even when the user does not make any changes to the image.
 * @property {boolean} [vibrate=false] - **[Android only]** Whether or not to vibrate when certain tasks are performed.
 * @property {number} [previewSize=0] - **[Android only]** Changes the size of the preview used in the editor. This is not the size of the output file, but only the size of the preview used during the edit.
 * @property {string} [outputFile=''] - **[Android only]** Path to save the file. If not specified the system default is used.
 * @property {boolean} [crop.custom=true] - **[iOS only]** Show custom option in crop tool
 * @property {boolean} [crop.invert=true] - **[iOS only]** Show invert option in crop tool
 * @property {boolean} [crop.original=true] - **[iOS only]** Show original option in crop tool
 * @property {boolean} [crop.customArray=[]] - **[iOS only]** An array of custom crop options. Each array element must be an object with three properties: `label`, `width` and `height`
 * @property {CSDKImageEditor.OrientationType[]} [orientations=[CSDKImageEditor.OrientationType.PORTRAIT]] - **[iOS only]** Sets the list of orientations that are available to the user. Ex: `[CSDKImageEditor.OrientationType.LANDSCAPE_LEFT, CSDKImageEditor.OrientationType.LANDSCAPE_RIGHT]`.
 * @property {CSDKImageEditor.LeftButtonType} [buttons.left=CSDKImageEditor.LeftButtonType.CANCEL] - **[iOS only]** Label for the left button. Must be one of CSDKImageEditor.LeftButtonType.
 * @property {CSDKImageEditor.RightButtonType} [buttons.left=CSDKImageEditor.RightButtonType.APPLY] - **[iOS only]** Label for the right button. Must be one of CSDKImageEditor.RightButtonType.
 */

module.exports = CSDKImageEditor;
