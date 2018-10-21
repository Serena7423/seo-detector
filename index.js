'use strict';

global.__BASE__ = process.cwd() + '/';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const fileHandler = require(global.__BASE__ + 'lib/file_handler');
const Detector = require(global.__BASE__ + 'lib/detector');
const config = require(global.__BASE__ + 'config');
const predefined = require(global.__BASE__ + 'predefined');


const _execute = async(() => {
    
    // Input & output setting
    // [Input]
    // 1. A HTML file
    //   input: {
    //     mode: config.inputMode.FILE,
    //     source: <file path>
    //   }
    // 2. Node Readable Stream
    //   input: {
    //     mode: config.inputMode.STREAM,
    //     source: <readable stream>
    //   }
    // [Output]
    // 1. A file
    //   output: {
    //     mode: config.outputMode.FILE,
    //     destination: <file path>
    //   }
    // 2. Node Writable Stream
    //   output: {
    //     mode: config.outputMode.STREAM,
    //     destination: <writable stream>
    //   }
    // 3. Console
    //   output: {
    //     mode: config.outputMode.CONSOLE,
    //     destination: ''
    //   }

    const detector = new Detector();

    // Rule define
    // {rule: config.ruleCategory.TAG_WITH_ATTRIBUTE, tag: 'a', attr: 'rel'}
    // {rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, parent: 'head', tag: 'meta', attr: 'name', value: 'keywords'}
    // {rule: config.ruleCategory.TAG_LIMIT_COUNT, tag: 'strong', count: 15}

    const rule = [
        predefined.detectATagWithRelAttr, 
        predefined.detectImgTagWithAltAttr,
        predefined.detectTitleInHead,
        predefined.detectMetaWithDescriptionInHead,
        predefined.detectMetaWithKeywordsInHead,
        predefined.detectStrongTag,
        predefined.detectH1Tag,
        {rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, tag: 'meta', attr: 'name', value: 'robots'}
    ];
    detector.detect(rule);
});

_execute()
    .then(function() {
        console.log('success');
    })
    .catch(function(err) {
        console.log(err);
    });
