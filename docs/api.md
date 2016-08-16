## Members

<dl>
<dt><a href="#CSDKImageEditor">CSDKImageEditor</a></dt>
<dd><p>A global object that lets you interact with the Creative SDK Image Editor.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#successCallback">successCallback</a> : <code>function</code></dt>
<dd><p>A callback to be used upon successful editing of an image.</p>
</dd>
<dt><a href="#errorCallback">errorCallback</a> : <code>function</code></dt>
<dd><p>A callback to handle errors when attempting to edit an image.</p>
</dd>
<dt><a href="#Options">Options</a> : <code>Object</code></dt>
<dd><p>An object for configuring Image Editor behavior.</p>
</dd>
</dl>

<a name="CSDKImageEditor"></a>

## CSDKImageEditor
A global object that lets you interact with the Creative SDK Image Editor.

**Kind**: global variable  

* [CSDKImageEditor](#CSDKImageEditor)
    * [.OutputType](#CSDKImageEditor.OutputType) : <code>enum</code>
    * [.ToolType](#CSDKImageEditor.ToolType) : <code>enum</code>
    * [.OrientationType](#CSDKImageEditor.OrientationType) : <code>enum</code>
    * [.LeftButtonType](#CSDKImageEditor.LeftButtonType) : <code>enum</code>
    * [.RightButtonType](#CSDKImageEditor.RightButtonType) : <code>enum</code>
    * [.edit(successCallback, errorCallback, imageUrl, options)](#CSDKImageEditor.edit)

<a name="CSDKImageEditor.OutputType"></a>

### CSDKImageEditor.OutputType : <code>enum</code>
**Kind**: static enum property of <code>[CSDKImageEditor](#CSDKImageEditor)</code>  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| JPEG | <code>number</code> | <code>0</code> | Return JPEG encoded image |
| PNG | <code>number</code> | <code>1</code> | Return PNG encoded image |

<a name="CSDKImageEditor.ToolType"></a>

### CSDKImageEditor.ToolType : <code>enum</code>
**Kind**: static enum property of <code>[CSDKImageEditor](#CSDKImageEditor)</code>  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| SHARPNESS | <code>number</code> | <code>0</code> | 
| EFFECTS | <code>number</code> | <code>1</code> | 
| REDEYE | <code>number</code> | <code>2</code> | 
| CROP | <code>number</code> | <code>3</code> | 
| WHITEN | <code>number</code> | <code>4</code> | 
| DRAW | <code>number</code> | <code>5</code> | 
| STICKERS | <code>number</code> | <code>6</code> | 
| TEXT | <code>number</code> | <code>7</code> | 
| BLEMISH | <code>number</code> | <code>8</code> | 
| MEME | <code>number</code> | <code>9</code> | 
| ORIENTATION | <code>number</code> | <code>10</code> | 
| ENHANCE | <code>number</code> | <code>11</code> | 
| FRAMES | <code>number</code> | <code>12</code> | 
| SPLASH | <code>number</code> | <code>13</code> | 
| FOCUS | <code>number</code> | <code>14</code> | 
| BLUR | <code>number</code> | <code>15</code> | 
| VIGNETTE | <code>number</code> | <code>16</code> | 
| LIGHTING | <code>number</code> | <code>17</code> | 
| COLOR | <code>number</code> | <code>18</code> | 
| OVERLAYS | <code>number</code> | <code>19</code> | 
| ADJUST | <code>number</code> | <code>20</code> | 

<a name="CSDKImageEditor.OrientationType"></a>

### CSDKImageEditor.OrientationType : <code>enum</code>
**Kind**: static enum property of <code>[CSDKImageEditor](#CSDKImageEditor)</code>  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| PORTRAIT | <code>number</code> | <code>1</code> | 
| PORTRAIT_UPSIDE_DOWN | <code>number</code> | <code>2</code> | 
| LANDSCAPE_RIGHT | <code>number</code> | <code>3</code> | 
| LANDSCAPE_LEFT | <code>number</code> | <code>4</code> | 

<a name="CSDKImageEditor.LeftButtonType"></a>

### CSDKImageEditor.LeftButtonType : <code>enum</code>
**Kind**: static enum property of <code>[CSDKImageEditor](#CSDKImageEditor)</code>  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| CANCEL | <code>number</code> | <code>0</code> | 
| BACK | <code>number</code> | <code>1</code> | 
| EXIT | <code>number</code> | <code>2</code> | 

<a name="CSDKImageEditor.RightButtonType"></a>

### CSDKImageEditor.RightButtonType : <code>enum</code>
**Kind**: static enum property of <code>[CSDKImageEditor](#CSDKImageEditor)</code>  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| DONE | <code>number</code> | <code>0</code> | 
| SAVE | <code>number</code> | <code>1</code> | 
| NEXT | <code>number</code> | <code>2</code> | 
| SEND | <code>number</code> | <code>3</code> | 

<a name="CSDKImageEditor.edit"></a>

### CSDKImageEditor.edit(successCallback, errorCallback, imageUrl, options)
Launches the Image Editor.

**Kind**: static method of <code>[CSDKImageEditor](#CSDKImageEditor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| successCallback | <code>[successCallback](#successCallback)</code> | See type definition. |
| errorCallback | <code>[errorCallback](#errorCallback)</code> | See type definition. |
| imageUrl | <code>string</code> | URL of the image to be edited. |
| options | <code>[Options](#Options)</code> | An object containing optional property/value pairs. |

<a name="successCallback"></a>

## successCallback : <code>function</code>
A callback to be used upon successful editing of an image.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| newUrl | <code>string</code> | The URL of the new edited image. |

<a name="errorCallback"></a>

## errorCallback : <code>function</code>
A callback to handle errors when attempting to edit an image.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Object</code> | Error object. |

<a name="Options"></a>

## Options : <code>Object</code>
An object for configuring Image Editor behavior.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| outputType | <code>[OutputType](#CSDKImageEditor.OutputType)</code> | <code>Same as original image</code> | Forces a specific output type. Ex: `CSDKImageEditor.OutputType.JPEG`. |
| tools | <code>[Array.&lt;ToolType&gt;](#CSDKImageEditor.ToolType)</code> | <code>All tools</code> | Sets the list of tools that are available to the user, in the order you provide them within the array. Ex: `[CSDKImageEditor.Tooltype.CROP]`. |
| quality | <code>number</code> | <code>100</code> | Sets the quality of the output of the image. This setting only affects `OutputType.JPEG` images. Valid values are `1` to `100`, inclusive. |
| confirmExit | <code>boolean</code> | <code>false</code> | **[Android only]** Sets whether or not to confirm exiting the image editor when the user clicks done. |
| outputSize | <code>number</code> | <code>0</code> | **[Android only]** Sets the size of the output image in mega pixels. Valid values are `0` to `30`, inclusive. Where `0` is the size of the preview image. |
| saveWithNoChanges | <code>boolean</code> | <code>true</code> | **[Android only]** When `true` the success callback will be invoked even when the user does not make any changes to the image. If `false` the error callback will be invoked even when the user does not make any changes to the image. |
| vibrate | <code>boolean</code> | <code>false</code> | **[Android only]** Whether or not to vibrate when certain tasks are performed. |
| previewSize | <code>number</code> | <code>0</code> | **[Android only]** Changes the size of the preview used in the editor. This is not the size of the output file, but only the size of the preview used during the edit. |
| outputFile | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | **[Android only]** Path to save the file. If not specified the system default is used. |
| crop.custom | <code>boolean</code> | <code>true</code> | **[iOS only]** Show custom option in crop tool |
| crop.invert | <code>boolean</code> | <code>true</code> | **[iOS only]** Show invert option in crop tool |
| crop.original | <code>boolean</code> | <code>true</code> | **[iOS only]** Show original option in crop tool |
| crop.customArray | <code>boolean</code> | <code>[]</code> | **[iOS only]** An array of custom crop options. Each array element must be an object with three properties: `label`, `width` and `height` |
| orientations | <code>[Array.&lt;OrientationType&gt;](#CSDKImageEditor.OrientationType)</code> | <code>[CSDKImageEditor.OrientationType.PORTRAIT]</code> | **[iOS only]** Sets the list of orientations that are available to the user. Ex: `[CSDKImageEditor.OrientationType.LANDSCAPE_LEFT, CSDKImageEditor.OrientationType.LANDSCAPE_RIGHT]`. |
| buttons.left | <code>[LeftButtonType](#CSDKImageEditor.LeftButtonType)</code> | <code>CSDKImageEditor.LeftButtonType.CANCEL</code> | **[iOS only]** Label for the left button. Must be one of CSDKImageEditor.LeftButtonType. |
| buttons.left | <code>[RightButtonType](#CSDKImageEditor.RightButtonType)</code> | <code>CSDKImageEditor.RightButtonType.APPLY</code> | **[iOS only]** Label for the right button. Must be one of CSDKImageEditor.RightButtonType. |

