#import <Cordova/CDVPlugin.h>

@interface CDVImageEditor : CDVPlugin
{
    NSString *callbackId;
}

@property (nonatomic, retain) NSString *callbackId;

- (void)edit:(CDVInvokedUrlCommand*)command;

@end
