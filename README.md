# seo-detector

This package can validate pre-defined or customized SEO rules for web pages. The detector can handle streams or file input and supports streams, file, or console for output.

## Installation

```bash
npm install --save seo-detector
```

## Usage

Here's an example in NodeJS using Promises with async/await:

* With NodeJS (>= 8)
```js
const Detector = require('seo-detector');
const detector = new Detector();

const rule = [
        predefined.detectATagWithRelAttr, 
        predefined.detectImgTagWithAltAttr,
        predefined.detectTitleInHead,
        predefined.detectMetaWithDescriptionInHead,
        predefined.detectMetaWithKeywordsInHead,
        predefined.detectStrongTag,
        predefined.detectH1Tag,
        {
            rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, 
            tag: 'meta', 
            attr: 'name', 
            value: 'robots'
        }
];

(async () => {
    await detector.detect(rule);
})();
```

* With NodeJS (< 8)
```js
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const Detector = require('seo-detector');
const detector = new Detector();

const execute = async(() => {
    const Detector = require('seo-detector');
    const detector = new Detector();

    const rule = [
        predefined.detectATagWithRelAttr, 
        predefined.detectImgTagWithAltAttr,
        predefined.detectTitleInHead,
        predefined.detectMetaWithDescriptionInHead,
        predefined.detectMetaWithKeywordsInHead,
        predefined.detectStrongTag,
        predefined.detectH1Tag,
        {
            rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, 
            tag: 'meta', 
            attr: 'name', 
            value: 'robots'
        }
    ];
    await(detector.detect(rule));
});

execute()
.then(function() {
    console.log('success');
})
.catch(function(err) {
    console.log(err);
});
```

### Input Settings
You can detect Html file from a URL or a readable stream. The default input is an example html. 


* File path
```js
input: {
    mode: config.inputMode.FILE,
    source: <file path>
}
```
* Readable Stream
```js
input: {
    mode: config.inputMode.STREAM,
    source: <readable stream>
}
```

### Output Settings
The detection result can be exported into a file, a writable stream, or console. The default output is console mode.  
* File path
```js
output: {
    mode: config.outputMode.FILE,
    destination: <file path>
}
```
* Writable Stream
```js
output: {
    mode: config.outputMode.STREAM,
    destination: <writable stream>
}
```
* Console
```js
output: {
    mode: config.outputMode.CONSOLE,
    destination: ''
}
```

### Rules Configuration
The detector can detect with multiple rules pre-defined or customized by yourself.

#### Pre-defined Rules
Here is a list of pre-defined currently available. It's defined in `predefined.js` file. Add the rule keys to a rule array, and pass to a detector.

Rule key                                | Description
--------------------------------------- | --------------------------------------
**detectATagWithRelAttr**               | Detect if any <img /> tag without alt attribute
**detectImgTagWithAltAttr**             | Detect if any <a /> tag without rel attribute
**detectTitleInHead**                   | In <head> tag, detect if header doesn’t have <title> tag
**detectMetaWithDescriptionInHead**     | In <head> tag, detect if header doesn’t have <meta name=“descriptions” ... /> tag
**detectMetaWithKeywordsInHead**        | In <head> tag, detect if header doesn’t have <meta name=“keywords” ... /> tag
**detectStrongTag**                     | Detect if there’re more than 15 <strong&gt; tag in HTML
**detectH1Tag**                         | Detect if a HTML have more than one <H1&gt; tag

#### Customized Rules
There are three types of rule can be customized.
1. Detect if any specific tag without a defined attribute.
```js
{
    rule: config.ruleCategory.TAG_WITH_ATTRIBUTE, 
    tag: 'a', 
    attr: 'rel'
}
```
2. Detect if any specific child tag without a defined attribute and a defined value in a specific parent tag. (The keys `parent`, `attr`, and `value` are optional.)
```js
{
    rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, 
    parent: 'head', 
    tag: 'meta', 
    attr: 'name', 
    value: 'keywords'
}
```
3. Detect if the number of a specific tag in the whole contents is greater than a defined number.
```js
{
    rule: config.ruleCategory.TAG_LIMIT_COUNT, 
    tag: 'strong', 
    count: 15
}
```

## Test
The tests run the SEO detector with mocha for several sample HTMLs in `test/` and output the results for each mode.

To run the tests:
```bash
npm test
```
