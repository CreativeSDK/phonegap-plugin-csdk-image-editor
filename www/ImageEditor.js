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

var exec = cordova.require('cordova/exec'),
    utils = cordova.require('cordova/utils');

var ImageEditor = {
    edit: function(successCallback, errorCallback, imageUrl, options) {
        options = options || {};

        var outputType = ImageEditor.getOutputType(imageUrl, options.outputType);
        var tools = ImageEditor.getTools(options.tools);

        var args = [imageUrl, outputType, tools];

        exec(successCallback, errorCallback, 'ImageEditor', 'edit', args);
    },
    getOutputType: function(imageUrl, outputType) {
        if (outputType !== null && outputType !== 'undefined' &&
            (outputType === ImageEditor.OutputType.JPEG || outputType === ImageEditor.OutputType.PNG)) {
            return outputType;
        } else {
            if (imageUrl.toLowerCase().endsWith('png')) {
                return ImageEditor.OutputType.PNG;
            } else {
                return ImageEditor.OutputType.JPEG;
            }
         }
    },
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
    /**
     * @enum {number}
     */
    OutputType:{
        /** Return JPEG encoded image */
        JPEG: 0,
        /** Return PNG encoded image */
        PNG: 1
    },
    /**
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
    }
};

module.exports = ImageEditor;
