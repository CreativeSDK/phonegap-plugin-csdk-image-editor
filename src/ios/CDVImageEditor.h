#import <Cordova/CDVPlugin.h>

enum CDVEncodingType {
    EncodingTypeJPEG = 0,
    EncodingTypePNG
};
typedef NSUInteger CDVEncodingType;

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
