#import <Cordova/CDVPlugin.h>

@interface CDVImageEditor : CDVPlugin
{
    NSString *callbackId;
    NSString *imageUri;
}

@property (nonatomic, retain) NSString *callbackId;
@property (nonatomic, retain) NSString *imageUri;

- (void)edit:(CDVInvokedUrlCommand*)command;

@end
