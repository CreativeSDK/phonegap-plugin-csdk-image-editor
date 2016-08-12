<!--
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
-->

phonegap-plugin-csdk-image-editor
------------------------

[![Stories in Ready](https://badge.waffle.io/CreativeSDK/phonegap-plugin-csdk-image-editor.png?label=ready&title=Ready)](http://waffle.io/CreativeSDK/phonegap-plugin-csdk-image-editor)

The Creative SDK Image Editor UI component provides a solution for developers seeking to add powerful photo editing to their Android apps.

The Image Editor includes over twenty advanced imaging tools covering everything from Effects and Crop to Redeye and Blemish. The tools are all GPU-accelerated, so all image modifications happen in real time or close to it.

This plugin makes it possible for you to use the Creative SDK Image Editor in your PhoneGap apps. Read on to learn how!

### Contents

- [Prerequisites](#prereqs)
- [Installation](#install)
- [Setup guide](#setup)
- [Sample code](#sample)
- [API guide](#api)

<a name="prereqs"></a>
# Prerequisites

**Required:** This guide will assume that you have installed all software and completed all of the steps in the [Client Auth guide](https://github.com/CreativeSDK/phonegap-plugin-csdk-client-auth).


<a name="install"></a>
# Installation

## Adding the plugin

Use the command below to add the plugin to your app.

```
phonegap plugin add --save https://github.com/CreativeSDK/phonegap-plugin-csdk-image-editor
```

## Downloading the Creative SDK

**iOS** 

To get the iOS SDK, go to the [Downloads page](https://creativesdk.adobe.com/downloads.html), download the ZIP files, and extract them to the `src/ios` folder of this plugin. Extracting the ZIP will create an `AdobeCreativeSDKFrameworks` folder. 

The ZIP files contain all the frameworks in the Creative SDK, but for this plugin we will only be using the `AdobeCreativeSDKCore.framework`.


**Android** 

No action is required for Android. The Creative SDK for Android is delivered as a remote Maven repository, and the required framework will be downloaded automatically by the plugin.


<a name="setup"></a>
# Setup guide

1. `cd` into your existing PhoneGap app (must already include [Client Auth](https://github.com/CreativeSDK/phonegap-plugin-csdk-client-auth))
1. Add this plugin (see "Adding the plugin" above)
1. **iOS only:** download and add the Creative SDK to this plugin's `src/ios` directory (see "Downloading the Creative SDK" above)
1. Build and run for your platform


<a name="sample"></a>
# Sample code

## `www/index.html`

Add a button within the `body`. The PhoneGap "Hello World" example includes a `div` with an ID of `app`, so for this example, we are including it in there.

```
// ...

<div class="app">
    
	// ...

    <button id="launch-editor">Launch image editor</button>
</div>

// ...

```

## `www/js/index.js`

_**Note:** Most of the code below comes from the PhoneGap "Hello World" example, and we are providing it here for context._

This plugin provides access to a global `CSDKImageEditor` object. 

The `CSDKImageEditor` object exposes a `.edit()` function, and some enums to use when setting up your options.

See comments **#1-2** below for relevant code:

```
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        // ...

        /* 1) Add a click handler for your button */
        document.getElementById('launch-editor').addEventListener('click', this.launchEditor, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        // ...
    },

    /* 2) Make a helper function to launch the Image Editor */
    launchEditor: function() {
        
    	/* 2.a) Prep work for calling `.edit()` */
        function success(newUrl) {
            console.log("Success!", newUrl);
        }

        function error(error) {
            console.log("Error!", error);
        }

        var imageUrl = "<YOUR_IMAGE_HERE>";

        var options = {
            outputType: CSDKImageEditor.OutputType.PNG,
            tools: [
                CSDKImageEditor.ToolType.EFFECTS,
                CSDKImageEditor.ToolType.CROP
            ]
        };

        /* 2.b) Launch the Image Editor */
        CSDKImageEditor.edit(success, error, imageUrl, options);
    }
};
```


<a name="api"></a>
# API guide

## Global object

`CSDKImageEditor`

## Functions

`CSDKImageEditor.edit(successCallback, errorCallback, imageUrl[, options])`

- `successCallback()` receives one argument `newUrl`, which is the edited image
- `errorCallback()` receives one argument `error`
- `imageUrl` is a string URL location of the original image you want to edit
- `options` is an optional object you can pass. Will be set to `{}` if you don't pass this argument

## Options

You can pass the following property/value pairs in your `options` object:

- `outputType`
	This property forces the specific output type that you set. 

	When no `outputType` option is passed, the default is to output the same file type that you pass in.

	- `CSDKImageEditor.OutputType.PNG`
	- `CSDKImageEditor.OutputType.JPEG`
- `tools`
	This property lets you restrict the set of tools that are available to the user. The value for this property must be passed as an array of `CSDKImageEditor.ToolType` values.

	When no `tools` option is passed, the default is to display all tools. 

    - `CSDKImageEditor.ToolType.SHARPNESS`
    - `CSDKImageEditor.ToolType.EFFECTS`
    - `CSDKImageEditor.ToolType.REDEYE`
    - `CSDKImageEditor.ToolType.CROP`
    - `CSDKImageEditor.ToolType.WHITEN`
    - `CSDKImageEditor.ToolType.DRAW`
    - `CSDKImageEditor.ToolType.STICKERS`
    - `CSDKImageEditor.ToolType.TEXT`
    - `CSDKImageEditor.ToolType.BLEMISH`
    - `CSDKImageEditor.ToolType.MEME`
    - `CSDKImageEditor.ToolType.ORIENTATION`
    - `CSDKImageEditor.ToolType.ENHANCE`
    - `CSDKImageEditor.ToolType.FRAMES`
    - `CSDKImageEditor.ToolType.SPLASH`
    - `CSDKImageEditor.ToolType.FOCUS`
    - `CSDKImageEditor.ToolType.BLUR`
    - `CSDKImageEditor.ToolType.VIGNETTE`
    - `CSDKImageEditor.ToolType.LIGHTING`
    - `CSDKImageEditor.ToolType.COLOR`
    - `CSDKImageEditor.ToolType.OVERLAYS`
    - `CSDKImageEditor.ToolType.ADJUST`
- `quality`
	This property lets you set the quality of the output of the image. The value for this property can be a number from `1` to `100`, inclusive.