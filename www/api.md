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

| Name | Type | Description |
| --- | --- | --- |
| outputType | <code>[OutputType](#CSDKImageEditor.OutputType)</code> | Forces a specific output type. |
| tools | <code>[Array.&lt;ToolType&gt;](#CSDKImageEditor.ToolType)</code> | Sets the list of tools that are available to the user, in the order you provide them within the array. |
| quality | <code>number</code> | Sets the quality of the output of the image. Valid values are `1` to `100`, inclusive. |

