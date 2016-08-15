#import <Cordova/CDVPlugin.h>

enum CDVEncodingType {
    EncodingTypeJPEG = 0,
    EncodingTypePNG
};
typedef NSUInteger CDVEncodingType;

enum CDVToolType {
    ToolTypeSharpness = 0,
    ToolTypeEffects,
    ToolTypeRedeye,
    ToolTypeCrop,
    ToolTypeWhiten,
    ToolTypeDraw,
    ToolTypeStickers,
    ToolTypeText,
    ToolTypeBlemish,
    ToolTypeMeme,
    ToolTypeOrientation,
    ToolTypeEnhance,
    ToolTypeFrames,
    ToolTypeSplash,
    ToolTypeFocus,
    ToolTypeBlur,
    ToolTypeVignette,
    ToolTypeLighting,
    ToolTypeColor,
    ToolTypeOverlays,
    ToolTypeAdjust
};
typedef NSUInteger CDVToolType;

enum CDVLeftButtonType {
    LeftButtonTypeCancel = 0,
    LeftButtonTypeBack,
    LeftButtonTypeExit
};
typedef NSUInteger CDVLeftButtonType;

enum CDVRightButtonType {
    RightButtonTypeDone = 0,
    RightButtonTypeSave,
    RightButtonTypeNext,
    RightButtonTypeSend
};
typedef NSUInteger CDVRightButtonType;

@interface CDVImageEditor : CDVPlugin
{
    NSString *callbackId;
    NSString *imageUri;
    NSNumber *encodingType;
    NSNumber *quality;
}

@property (nonatomic, retain) NSString *callbackId;
@property (nonatomic, retain) NSString *imageUri;
@property (nonatomic, retain) NSNumber *encodingType;
@property (nonatomic, retain) NSNumber *quality;

- (void)edit:(CDVInvokedUrlCommand*)command;

@end
