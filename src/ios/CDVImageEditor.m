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

#define ADB_PHOTO_PREFIX @"adb_photo_"
#define isEqualIgnoreCaseToString(string1, string2) ([string1 caseInsensitiveCompare:string2] == NSOrderedSame)

@implementation CDVImageEditor

@synthesize callbackId;
@synthesize imageUri;

- (void)edit:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;

    self.imageUri = [command.arguments objectAtIndex:0];
    NSData *imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:self.imageUri]];
    UIImage *image = [UIImage imageWithData:imageData];

    AdobeUXImageEditorViewController *editorController =
        [[AdobeUXImageEditorViewController alloc] initWithImage:image];
	[editorController setDelegate:self];
	[self.viewController presentViewController:editorController animated:YES completion:nil];
}

- (void)photoEditor:(AdobeUXImageEditorViewController *)editor finishedWithImage:(UIImage *)image
{
    CDVPluginResult *pluginResult = nil;
    NSData* data = [self processImage:image];
    if (data) {
        NSString* extension = [self.imageUri pathExtension];
        NSString* filePath = [self tempFilePath:extension];
        NSError* err = nil;

        // save file
        if (![data writeToFile:filePath options:NSAtomicWrite error:&err]) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_IO_EXCEPTION messageAsString:[err localizedDescription]];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[NSURL fileURLWithPath:filePath] absoluteString]];
        }
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
}

- (void)photoEditorCanceled:(AdobeUXImageEditorViewController *)editor
{
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
}

- (NSString*)tempFilePath:(NSString*)extension
{
    NSString* docsPath = [NSTemporaryDirectory()stringByStandardizingPath];
    NSFileManager* fileMgr = [[NSFileManager alloc] init]; // recommended by Apple (vs [NSFileManager defaultManager]) to be threadsafe
    NSString* filePath;

    // generate unique file name
    int i = 1;
    do {
        filePath = [NSString stringWithFormat:@"%@/%@%03d.%@", docsPath, ADB_PHOTO_PREFIX, i++, extension];
    } while ([fileMgr fileExistsAtPath:filePath]);

    return filePath;
}

- (NSData*)processImage:(UIImage*)image
{
    NSData* data = nil;
    NSString* extension = [self.imageUri pathExtension];

    if (isEqualIgnoreCaseToString(extension, @"png")) {
        data = UIImagePNGRepresentation(image);
    } else if (isEqualIgnoreCaseToString(extension, @"jpg") || isEqualIgnoreCaseToString(extension, @"jpeg")) {
        data = UIImageJPEGRepresentation(image, 1.0);
    }

    return data;
}

@end
