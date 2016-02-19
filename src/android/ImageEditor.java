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
import android.net.Uri;
import android.util.Base64;
import android.util.Log;

import com.adobe.creativesdk.aviary.AdobeImageIntent;

/**
* This class exposes methods in Cordova that can be called from JavaScript.
*/
public class ImageEditor extends CordovaPlugin {

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

        Log.d("Simon", "execute of ImageEditor");

        if (action.equals("edit")) {
            Uri imageUri = Uri.parse(args.getString(0));

            Intent imageEditorIntent =
                new AdobeImageIntent.Builder(this.cordova.getActivity().getApplicationContext())
                     .setData(imageUri)
                     .build();

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
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == Activity.RESULT_OK) {
            switch (requestCode) {
                case 1:
                    Uri editedImageUri = data.getData();
                    this.callbackContext.success(editedImageUri.toString());

                    break;
            }
        }
    }
}
