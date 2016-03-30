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

# Prerequisites

Before you can work with the Creative SDK, you must register your application and get Client ID and Client Secret values. For details, see [Registering Your Application](https://creativesdk.adobe.com/docs/ios/#/articles/gettingstarted/index.html).

To get the iOS SDK, go to the [Downloads page](https://creativesdk.adobe.com/downloads.html), download the ZIP files, and extract them to the src/ios folder of this plugin. It should create a AdobeCreativeSDKFrameworks folder. The ZIP files contain all the frameworks in the Creative SDK but for this plugin we will only be using the AdobeCreativeSDKCore.framework.

The following software is required:
- Xcode 7 or higher
- iOS 8.2 or higher

# Installation

To add to your app:

```
phonegap plugin add --save https://github.com/CreativeSDK/phonegap-plugin-csdk-image-editor
```
