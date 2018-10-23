'use strict';

const assert = require('assert');
const fs = require('fs');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const Detector = require('../lib/detector');
const config = require('../config');
const predefined = require('../predefined');
const fileHandler = require('../lib/file_handler');

describe('Detector input error', function () {
    const errorPath = '../static/error.txt';
    it('should throw error due to lack of source key in input', async(function () {
        const param = {
            input: {
                mode: config.inputMode.FILE
            },
            output: {
                mode: config.outputMode.CONSOLE,
                destination: ''
            }
        }
        try {
            const detector = new Detector(param);
            await(detector.detect([]));
        } catch(err) {
            assert.equal(err.message, 'Wrong input parameters. Input object requires mode and source keys.');
        }
    }));    
    
    it('should throw error due to lack of mode key in input', async(function () {
        const param = {
            input: {
                source: global.__BASE__ + '/static/index.html'
            },
            output: {
                mode: config.outputMode.CONSOLE,
                destination: ''
            }
        }
        try {
            const detector = new Detector(param);
            await(detector.detect([]));
        } catch(err) {
            assert.equal(err.message, 'Wrong input parameters. Input object requires mode and source keys.');
        }
    }));

    it('should throw error due to invalid path for file input', async(function () {
        const param = {
            input: {
                mode: config.inputMode.FILE,
                source: errorPath
            },
            output: {
                mode: config.outputMode.CONSOLE,
                destination: ''
            }
        }
        try {
            const detector = new Detector(param);
            await(detector.detect([]));
        } catch(err) {
            assert(err instanceof Error);
            assert.equal(err.code, 'ENOENT');
        }
    }));

    it('should throw error due to invalid path for stream input', async(function () {
        const stream = fs.createReadStream(errorPath).setEncoding("utf8");
        const param = {
            input: {
                mode: config.inputMode.STREAM,
                source: stream
            },
            output: {
                mode: config.outputMode.CONSOLE,
                destination: ''
            }
        }
        try {
            const detector = new Detector(param);
            await(detector.detect([]));
        } catch(err) {
            assert(err instanceof Error);
            assert.equal(err.code, 'ENOENT');
        }
    }));
});

describe('Detector output error', function () {

    it('should throw error due to lack of mode key in output', async(function () {
        const param = {
            input: {
                mode: config.inputMode.FILE,
                source: global.__BASE__ + '/static/index.html'
            },
            output: {
                destination: ''
            }
        }
        try {
            const detector = new Detector(param);
            await(detector.detect([]));
        } catch(err) {
            assert.equal(err.message, 'Wrong output parameters. Output object requires mode key.');
        }
    }));    
    
    it('should throw error due to lack of mode key in output', async(function () {
        const param = {
            input: {
                mode: config.inputMode.FILE,
                source: global.__BASE__ + '/static/index.html'
            },
            output: {
                mode: config.outputMode.FILE,
                destination: ''
            }
        }
        try {
            const detector = new Detector(param);
            await(detector.detect([]));
        } catch(err) {
            assert.equal(err.message, 'Wrong output parameters. This mode of output object requires destination key.');
        }
    }));

    // output invalid file path
    // output invalid file stream
});

describe('Detector no html content', function () {

    it('should have result text with no content', async(function () {
        const param = {
            input: {
                mode: config.inputMode.FILE,
                source: global.__BASE__ + '/test/empty.html'
            },
            output: {
                mode: config.outputMode.CONSOLE,
                destination: ''
            }
        }
        const detector = new Detector(param);
        await(detector.detect([predefined.detectMetaWithKeywordsInHead]));
        assert.equal(detector.result, 'No content.');
    }));
});

describe('Detector rule format error', function () {

    it('should throw error due to no rule', async(function () {
        const param = {
            input: {
                mode: config.inputMode.FILE,
                source: global.__BASE__ + '/static/index.html'
            },
            output: {
                mode: config.outputMode.CONSOLE,
                destination: ''
            }
        }
        try {
            const detector = new Detector(param);
            await(detector.detect([{}]));
        } catch(err) {
            assert.equal(err.message, 'There is no rule key in the item.');
        }
    }));

    it('should throw error due to wrong format of TAG_WITH_ATTRIBUTE rule', async(function () {
        const param = {
            input: {
                mode: config.inputMode.FILE,
                source: global.__BASE__ + '/static/index.html'
            },
            output: {
                mode: config.outputMode.CONSOLE,
                destination: ''
            }
        }
        try {
            const detector = new Detector(param);
            await(detector.detect([{rule: config.ruleCategory.TAG_WITH_ATTRIBUTE, tag: 'a'}]));
        } catch(err) {
            assert.equal(err.message, 'There is no tag or attr key in the item.');
        }
    }));
    
    it('should throw error due to wrong format of TAG_LIMIT_COUNT rule', async(function () {
        const param = {
            input: {
                mode: config.inputMode.FILE,
                source: global.__BASE__ + '/static/index.html'
            },
            output: {
                mode: config.outputMode.CONSOLE,
                destination: ''
            }
        }
        try {
            const detector = new Detector(param);
            await(detector.detect([{rule: config.ruleCategory.TAG_LIMIT_COUNT, tag: 'h1'}]));
        } catch(err) {
            assert.equal(err.message, 'There is no tag or count key in the item.');
        }
    })); 
    
    it('should throw error due to wrong format of CHILD_TAG_WITH_ATTRIBUTE rule', async(function () {
        const param = {
            input: {
                mode: config.inputMode.FILE,
                source: global.__BASE__ + '/static/index.html'
            },
            output: {
                mode: config.outputMode.CONSOLE,
                destination: ''
            }
        }
        try {
            const detector = new Detector(param);
            await(detector.detect([{rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, parent: 'head'}]));
        } catch(err) {
            assert.equal(err.message, 'There is no tag key in the item.');
        }
    }));
    
});

describe('Detector input and output', function() {
    
    it('should read with stream and get result in stream successfully', async(function () {
        const inStream = fs.createReadStream(global.__BASE__ + 'test/test.html').setEncoding("utf8");
        const outStream = fs.createWriteStream(global.__BASE__ + 'test/outstream.txt')
        const param = {
            input: {
                mode: config.inputMode.STREAM,
                source: inStream
            },
            output: {
                mode: config.outputMode.STREAM,
                destination: outStream
            }
        }

        const detector = new Detector(param);
        const rule = [
            predefined.detectATagWithRelAttr, 
            predefined.detectH1Tag
        ];
        detector.detect(rule);

        const result = await(fileHandler.read(global.__BASE__ + 'test/outstream.txt'));
        console.log(result);
        assert.equal(result, detector.result);
    }));

    it('should read with file and get result in file successfully', async(function () {
        const param = {
            input: {
                mode: config.inputMode.FILE,
                source: global.__BASE__ + 'test/test.html'
            },
            output: {
                mode: config.outputMode.FILE,
                destination: global.__BASE__ + 'test/out.txt'
            }
        }

        const detector = new Detector(param);
        const rule = [
            predefined.detectMetaWithDescriptionInHead, 
            predefined.detectH1Tag
        ];
        detector.detect(rule);

        const result = await(fileHandler.read(global.__BASE__ + 'test/out.txt'));
        assert.equal(result, detector.result);
    }));
});

describe('Detector rule - valid', function() {
    const param = {
        input: {
            mode: config.inputMode.FILE,
            source: global.__BASE__ + '/test/test_valid.html'
        },
        output: {
            mode: config.outputMode.CONSOLE,
            destination: ''
        }
    }
    let detector;
    before(function() {
        detector = new Detector(param);
    });

    it('should be valid for detectATagWithRelAttr rule', async(function () {
        const rule = [predefined.detectATagWithRelAttr];
        await(detector.detect(rule));
        assert.equal(detector.result, 'Valid');
    }));

    it('should be valid for detectImgTagWithAltAttr rule', async(function () {
        const rule = [predefined.detectImgTagWithAltAttr];
        await(detector.detect(rule));
        assert.equal(detector.result, 'Valid');
    }));

    it('should be valid for detectTitleInHead rule', async(function () {
        const rule = [predefined.detectTitleInHead];
        await(detector.detect(rule));
        assert.equal(detector.result, 'Valid');
    }));

    it('should be valid for detectMetaWithDescriptionInHead rule', async(function () {
        const rule = [predefined.detectMetaWithDescriptionInHead];
        await(detector.detect(rule));
        assert.equal(detector.result, 'Valid');
    }));

    it('should be valid for detectMetaWithKeywordsInHead rule', async(function () {
        const rule = [predefined.detectMetaWithKeywordsInHead];
        await(detector.detect(rule));
        assert.equal(detector.result, 'Valid');
    }));

    it('should be valid for detectStrongTag rule', async(function () {
        const rule = [predefined.detectStrongTag];
        await(detector.detect(rule));
        assert.equal(detector.result, 'Valid');
    }));

    it('should be valid for detectH1Tag rule', async(function () {
        const rule = [predefined.detectH1Tag];
        await(detector.detect(rule));
        assert.equal(detector.result, 'Valid');
    }));

    it('should be valid for customized rule', async(function () {
        const rule = [{rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, tag: 'meta', attr: 'name', value: 'alpaca'}];
        await(detector.detect(rule));
        assert.equal(detector.result, 'Valid');
    }));
});

describe('Detector rule - invalid', function() {
    const param = {
        input: {
            mode: config.inputMode.FILE,
            source: global.__BASE__ + '/test/test_invalid.html'
        },
        output: {
            mode: config.outputMode.CONSOLE,
            destination: ''
        }
    }
    let detector;
    before(function() {
        detector = new Detector(param);
    });

    it('should be invalid for detectATagWithRelAttr rule', async(function () {
        const rule = [predefined.detectATagWithRelAttr];
        detector.detect(rule);
        assert.equal(detector.result, 'There are 3 <a> tag without rel attribute.');
    }));

    it('should be invalid for detectImgTagWithAltAttr rule', async(function () {
        const rule = [predefined.detectImgTagWithAltAttr];
        detector.detect(rule);
        assert.equal(detector.result, 'There are 1 <img> tag without alt attribute.');
    }));

    it('should be invalid for detectTitleInHead rule', async(function () {
        const rule = [predefined.detectTitleInHead];
        detector.detect(rule);
        assert.equal(detector.result, 'There is no <title> tag.');
    }));

    it('should be invalid for detectMetaWithDescriptionInHead rule', async(function () {
        const rule = [predefined.detectMetaWithDescriptionInHead];
        detector.detect(rule);
        assert.equal(detector.result, 'There is no <meta> tag with name attribute and descriptions value.');
    }));

    it('should be invalid for detectMetaWithKeywordsInHead rule', async(function () {
        const rule = [predefined.detectMetaWithKeywordsInHead];
        detector.detect(rule);
        assert.equal(detector.result, 'There is no <meta> tag with name attribute and keywords value.');
    }));

    it('should be invalid for detectStrongTag rule', async(function () {
        const rule = [predefined.detectStrongTag];
        detector.detect(rule);
        assert.equal(detector.result, 'This HTML have more than 15 <strong> tag.');
    }));

    it('should be invalid for detectH1Tag rule', async(function () {
        const rule = [predefined.detectH1Tag];
        detector.detect(rule);
        assert.equal(detector.result, 'This HTML have more than 1 <h1> tag.');
    }));

    it('should be invalid for customized rule', async(function () {
        const rule = [{rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, tag: 'meta', attr: 'name', value: 'alpaca'}];
        detector.detect(rule);
        assert.equal(detector.result, 'There is no <meta> tag with name attribute and alpaca value.');
    }));
});

describe('Detector rule - multiple rules', function() {
    const param = {
        input: {
            mode: config.inputMode.FILE,
            source: global.__BASE__ + 'test/test.html'
        },
        output: {
            mode: config.outputMode.CONSOLE,
            destination: ''
        }
    }
    let detector;
    before(function() {
        detector = new Detector(param);
    });

    it('should have results for multiple rules detection', async(function () {
        const rule = [
            predefined.detectATagWithRelAttr, 
            predefined.detectH1Tag, 
            {
                rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, 
                parent: 'head', 
                tag: 'meta', 
                attr: 'name', 
                value: 'alpaca'
            }
        ];
        detector.detect(rule);
        assert.equal(detector.result, 'There are 2 <a> tag without rel attribute.\nValid\nThere is no <meta> tag with name attribute and alpaca value.');
    }));
});
