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

#import <AdobeCreativeSDKImage/AdobeCreativeSDKImage.h>
#import "CDVImageEditor.h"

@implementation CDVImageEditor

@synthesize callbackId;

- (void)edit:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;

    NSString *imageUri = [command.arguments objectAtIndex:0];
    NSData *imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:imageUri]];
    UIImage *image = [UIImage imageWithData:imageData];

    AdobeUXImageEditorViewController *editorController =
        [[AdobeUXImageEditorViewController alloc] initWithImage:image];
	[editorController setDelegate:self];
	[self.viewController presentViewController:editorController animated:YES completion:nil];
}

- (void)photoEditor:(AdobeUXImageEditorViewController *)editor finishedWithImage:(UIImage *)image
{
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
}

- (void)photoEditorCanceled:(AdobeUXImageEditorViewController *)editor
{
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
}

@end
