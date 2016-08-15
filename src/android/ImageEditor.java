/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

package com.adobe.phonegap.csdk;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.net.Uri;
import android.util.Base64;
import android.util.Log;

import java.io.File;
import java.util.ArrayList;

import com.adobe.creativesdk.aviary.AdobeImageIntent;
import com.adobe.creativesdk.aviary.internal.filters.ToolLoaderFactory;
import com.adobe.creativesdk.aviary.internal.headless.utils.MegaPixels;

/**
* This class exposes methods in Cordova that can be called from JavaScript.
*/
public class ImageEditor extends CordovaPlugin {
    private static final String LOG_TAG = "CreativeSDK_ImageEditor";

    // Output types
    private static final int JPEG = 0;                  // Take a picture of type JPEG
    private static final int PNG = 1;                   // Take a picture of type PNG

    // Tool types
    private static final int SHARPNESS = 0;
    private static final int EFFECTS = 1;
    private static final int REDEYE = 2;
    private static final int CROP = 3;
    private static final int WHITEN = 4;
    private static final int DRAW = 5;
    private static final int STICKERS = 6;
    private static final int TEXT = 7;
    private static final int BLEMISH = 8;
    private static final int MEME = 9;
    private static final int ORIENTATION = 10;
    private static final int ENHANCE = 11;
    private static final int FRAMES = 12;
    private static final int SPLASH = 13;
    private static final int FOCUS = 14;
    private static final int BLUR = 15;
    private static final int VIGNETTE = 16;
    private static final int LIGHTING = 17;
    private static final int COLOR = 18;
    private static final int OVERLAYS = 19;
    private static final int ADJUST = 20;

    public CallbackContext callbackContext;

     /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArry of arguments for the plugin.
     * @param callbackContext   The callback context from which we were invoked.
     */
    @SuppressLint("NewApi")
    public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;

        if (action.equals("edit")) {
            String imageStr = args.getString(0);
            if (imageStr == null || "".equals(imageStr)) {
                this.callbackContext.error("Image Path must be specified");
            }
            Uri imageUri = Uri.parse(imageStr);

            AdobeImageIntent.Builder builder =
                new AdobeImageIntent.Builder(this.cordova.getActivity().getApplicationContext())
                    .setData(imageUri);

            // setup options
            setOutputType(builder, args.getInt(1));
            setToolsArray(builder, args.getJSONArray(2));
            builder.withOutputQuality(args.getInt(3));
            builder.withNoExitConfirmation(args.getBoolean(4));
            builder.withOutputSize(MegaPixels.valueOf("Mp"+args.getString(5)));
            builder.saveWithNoChanges(args.getBoolean(6));
            builder.withVibrationEnabled(args.getBoolean(7));

            int color = args.getInt(8);
            if (color != 0) {
                builder.withAccentColor(color);
            }

            int previewSize = args.getInt(9);
            if (previewSize > 0) {
                builder.withPreviewSize(previewSize);
            }

            String outputFile = args.getString(10);
            if (!"".equals(outputFile)) {
                File fp = new File(outputFile);
                builder.withOutput(fp);
            }

            Intent imageEditorIntent = builder.build();

            this.cordova.startActivityForResult((CordovaPlugin) this, imageEditorIntent, 1);

            PluginResult r = new PluginResult(PluginResult.Status.NO_RESULT);
            r.setKeepCallback(true);
            callbackContext.sendPluginResult(r);
        } else {
            return false;
        }
        return true;
    }

    /**
     * Called when the image editor exits.
     *
     * @param requestCode       The request code originally supplied to startActivityForResult(),
     *                          allowing you to identify who this result came from.
     * @param resultCode        The integer result code returned by the child activity through its setResult().
     * @param intent            An Intent, which can return result data to the caller (various data can be attached to Intent "extras").
     */
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (resultCode == Activity.RESULT_OK) {
            switch (requestCode) {
                case 1:
                    Uri editedImageUri = intent.getParcelableExtra(AdobeImageIntent.EXTRA_OUTPUT_URI);
                    this.callbackContext.success(editedImageUri.toString());

                    break;
            }
        } else if (resultCode == Activity.RESULT_CANCELED) {
            this.callbackContext.error("Editor Canceled");
        }
    }

    private void setOutputType(AdobeImageIntent.Builder builder, int outputType) {
        if (ImageEditor.JPEG == outputType) {
            builder.withOutputFormat(Bitmap.CompressFormat.JPEG);
        } else {
            builder.withOutputFormat(Bitmap.CompressFormat.PNG);
        }
    }

    private void setToolsArray(AdobeImageIntent.Builder builder, JSONArray toolsArray) {
        try {
            ToolLoaderFactory.Tools[] tools = createToolsArray(toolsArray);
            if (tools.length > 0) {
                builder.withToolList(tools);
            }
        } catch(JSONException e) {
            Log.e(LOG_TAG, e.getLocalizedMessage(), e);
        }
    }

    private ToolLoaderFactory.Tools[] createToolsArray(JSONArray toolsArray) throws JSONException {
        ArrayList<ToolLoaderFactory.Tools> tools = new ArrayList<ToolLoaderFactory.Tools>();
        for (int i=0; i<toolsArray.length(); i++) {
            int tool = toolsArray.getInt(i);
            if (tool >= 0 && tool <= 20) {
                switch(tool) {
                    case SHARPNESS:
                        tools.add(ToolLoaderFactory.Tools.SHARPNESS);
                        break;
                    case EFFECTS:
                        tools.add(ToolLoaderFactory.Tools.EFFECTS);
                        break;
                    case REDEYE:
                        tools.add(ToolLoaderFactory.Tools.REDEYE);
                        break;
                    case CROP:
                        tools.add(ToolLoaderFactory.Tools.CROP);
                        break;
                    case WHITEN:
                        tools.add(ToolLoaderFactory.Tools.WHITEN);
                        break;
                    case DRAW:
                        tools.add(ToolLoaderFactory.Tools.DRAW);
                        break;
                    case STICKERS:
                        tools.add(ToolLoaderFactory.Tools.STICKERS);
                        break;
                    case TEXT:
                        tools.add(ToolLoaderFactory.Tools.TEXT);
                        break;
                    case BLEMISH:
                        tools.add(ToolLoaderFactory.Tools.BLEMISH);
                        break;
                    case MEME:
                        tools.add(ToolLoaderFactory.Tools.MEME);
                        break;
                    case ORIENTATION:
                        tools.add(ToolLoaderFactory.Tools.ORIENTATION);
                        break;
                    case ENHANCE:
                        tools.add(ToolLoaderFactory.Tools.ENHANCE);
                        break;
                    case FRAMES:
                        tools.add(ToolLoaderFactory.Tools.FRAMES);
                        break;
                    case SPLASH:
                        tools.add(ToolLoaderFactory.Tools.SPLASH);
                        break;
                    case FOCUS:
                        tools.add(ToolLoaderFactory.Tools.FOCUS);
                        break;
                    case BLUR:
                        tools.add(ToolLoaderFactory.Tools.BLUR);
                        break;
                    case VIGNETTE:
                        tools.add(ToolLoaderFactory.Tools.VIGNETTE);
                        break;
                    case LIGHTING:
                        tools.add(ToolLoaderFactory.Tools.LIGHTING);
                        break;
                    case COLOR:
                        tools.add(ToolLoaderFactory.Tools.COLOR);
                        break;
                    case OVERLAYS:
                        tools.add(ToolLoaderFactory.Tools.OVERLAYS);
                        break;
                    case ADJUST:
                        tools.add(ToolLoaderFactory.Tools.ADJUST);
                        break;
                }
            }
        }
        return tools.toArray(new ToolLoaderFactory.Tools[tools.size()]);
    }
}
