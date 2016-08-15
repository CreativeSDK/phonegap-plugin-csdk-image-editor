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
@synthesize encodingType;
@synthesize quality;

- (void)edit:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;

    self.imageUri = [command.arguments objectAtIndex:0];
    self.encodingType = [command.arguments objectAtIndex:1];
    NSArray *tools = [self createToolArray:[command.arguments objectAtIndex:2]];
    self.quality = [[command.arguments objectAtIndex:3] integerValue] != 100 ? [command.arguments objectAtIndex:3] : [NSNumber numberWithInt:100];

    NSData *imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:self.imageUri]];
    UIImage *image = [UIImage imageWithData:imageData];

    AdobeUXImageEditorViewController *editorController =
        [[AdobeUXImageEditorViewController alloc] initWithImage:image];
	[editorController setDelegate:self];
    if ([tools count] > 0) {
        [AdobeImageEditorCustomization setToolOrder:tools];
    }

    BOOL custom = [[command.arguments objectAtIndex:11] boolValue];
    [AdobeImageEditorCustomization setCropToolCustomEnabled: custom];

    if (custom) {
        NSArray *crops = [self createCustomCropArray: [command.arguments objectAtIndex:14]];
        [AdobeImageEditorCustomization setCropToolPresets: crops];
    }

    BOOL invert = [[command.arguments objectAtIndex:12] boolValue];
    [AdobeImageEditorCustomization setCropToolInvertEnabled: invert];

    BOOL orig = [[command.arguments objectAtIndex:13] boolValue];
    [AdobeImageEditorCustomization setCropToolOriginalEnabled: orig];

    NSArray *orientations = [command.arguments objectAtIndex:15];
    [AdobeImageEditorCustomization setSupportedIpadOrientations:orientations];

    // setup buttons
    [AdobeImageEditorCustomization setLeftNavigationBarButtonTitle:[self getLeftButtonLabel:[command.arguments objectAtIndex:16]]];
    [AdobeImageEditorCustomization setRightNavigationBarButtonTitle:[self getRightButtonLabel:[command.arguments objectAtIndex:17]]];

	[self.viewController presentViewController:editorController animated:YES completion:nil];
}

- (void)photoEditor:(AdobeUXImageEditorViewController *)editor finishedWithImage:(UIImage *)image
{
    CDVPluginResult *pluginResult = nil;
    NSString *extension =  [self.encodingType integerValue] == EncodingTypePNG ? @"png" : @"jpg";
    NSData* data = [self processImage:image];
    if (data) {
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

    if ([self.encodingType integerValue] == EncodingTypePNG) {
        data = UIImagePNGRepresentation(image);
    } else if ([self.encodingType integerValue] == EncodingTypeJPEG) {
        data = UIImageJPEGRepresentation(image, [self.quality floatValue] / 100.0f);
    }

    return data;
}

- (NSString *) getLeftButtonLabel:(NSNumber*)buttonIndex
{
    NSString *label = kAFLeftNavigationTitlePresetCancel;
    int buttonId = [buttonIndex integerValue];
    switch(buttonId) {
        case LeftButtonTypeBack:
            label = kAFLeftNavigationTitlePresetBack;
            break;
        case LeftButtonTypeExit:
            label = kAFLeftNavigationTitlePresetExit;
            break;
        case LeftButtonTypeCancel:
        default:
            label = kAFLeftNavigationTitlePresetCancel;
            break;
    }
    return label;
}

- (NSString *) getRightButtonLabel:(NSNumber*)buttonIndex
{
    NSString *label = kAFRightNavigationTitlePresetDone;
    int buttonId = [buttonIndex integerValue];
    switch(buttonId) {
        case RightButtonTypeSave:
            label = kAFRightNavigationTitlePresetSave;
            break;
        case RightButtonTypeNext:
            label = kAFRightNavigationTitlePresetNext;
            break;
        case RightButtonTypeSend:
            label = kAFRightNavigationTitlePresetSend;
            break;
        case RightButtonTypeDone:
        default:
            label = kAFRightNavigationTitlePresetDone;
            break;
    }
    return label;
}

- (NSArray*) createToolArray:(NSArray*)toolOptions
{
    NSMutableArray *tools = [NSMutableArray array];

    for (NSNumber *tempNumber in toolOptions) {
        int toolId = [tempNumber integerValue];
        NSLog(@"Single element: %d", toolId);
        switch(toolId){
            case ToolTypeSharpness:
                [tools addObject: kAdobeImageEditorSharpness];
                break;
            case ToolTypeEffects:
                [tools addObject: kAdobeImageEditorEffects];
                break;
            case ToolTypeRedeye:
                [tools addObject: kAdobeImageEditorRedeye];
                break;
            case ToolTypeCrop:
                [tools addObject: kAdobeImageEditorCrop];
                break;
            case ToolTypeWhiten:
                [tools addObject: kAdobeImageEditorWhiten];
                break;
            case ToolTypeDraw:
                [tools addObject: kAdobeImageEditorDraw];
                break;
            case ToolTypeStickers:
                [tools addObject: kAdobeImageEditorStickers];
                break;
            case ToolTypeText:
                [tools addObject: kAdobeImageEditorText];
                break;
            case ToolTypeBlemish:
                [tools addObject: kAdobeImageEditorBlemish];
                break;
            case ToolTypeMeme:
                [tools addObject: kAdobeImageEditorMeme];
                break;
            case ToolTypeOrientation:
                [tools addObject: kAdobeImageEditorOrientation];
                break;
            case ToolTypeEnhance:
                [tools addObject: kAdobeImageEditorEnhance];
                break;
            case ToolTypeFrames:
                [tools addObject: kAdobeImageEditorFrames];
                break;
            case ToolTypeSplash:
                [tools addObject: kAdobeImageEditorSplash];
                break;
            case ToolTypeFocus:
                [tools addObject: kAdobeImageEditorFocus];
                break;
            case ToolTypeBlur:
                [tools addObject: kAdobeImageEditorBlur];
                break;
            case ToolTypeVignette:
                [tools addObject: kAdobeImageEditorVignette];
                break;
            case ToolTypeLighting:
                [tools addObject: kAdobeImageEditorLightingAdjust];
                break;
            case ToolTypeColor:
                [tools addObject: kAdobeImageEditorColorAdjust];
                break;
            case ToolTypeOverlays:
                [tools addObject: kAdobeImageEditorOverlay];
                break;
            /*
             * apparently the adjust tool is only on Android
             *
            case ToolTypeAdjust:
                [tools addObject: xxxxx];
                break;
             */
            default:
                // Ignore any tool not from the above
                break;
        }
    }

    return [tools copy];
}

- (NSArray*) createCustomCropArray:(NSArray*)cropOptions
{
    NSMutableArray *crops = [NSMutableArray array];

    for (NSDictionary *tempCrop in cropOptions) {
        NSMutableDictionary *crop = [NSMutableDictionary dictionaryWithCapacity: 3];
        [crop setObject:[tempCrop objectForKey:@"label"] forKey:kAFCropPresetName];
        [crop setObject:[tempCrop objectForKey:@"width"] forKey:kAFCropPresetWidth];
        [crop setObject:[tempCrop objectForKey:@"height"] forKey:kAFCropPresetHeight];

        [crops addObject: crop];
    }

    return [crops copy];
}

@end
