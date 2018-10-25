'use strict';

global.__BASE__ = process.cwd() + '/';

const htmlParser = require('cheerio');
const fileHandler = require(global.__BASE__ + 'lib/file_handler');
const stream = require(global.__BASE__ + 'lib/stream');
const {TagWithAttrRule} = require(global.__BASE__ + 'lib/rule');
const {TagLimitCountRule} = require(global.__BASE__ + 'lib/rule');
const {ChildTagWithAttrRule} = require(global.__BASE__ + 'lib/rule');
const config = require(global.__BASE__ + 'config');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const default_options = {
    input: {
        mode: config.inputMode.FILE,
        source: global.__BASE__ + '/static/index.html'
    },
    output: {
        mode: config.outputMode.CONSOLE,
        destination: ''
    }
};

class Detector {
    constructor(options={}) {
        this.input = options.input || default_options.input;
        this.output = options.output || default_options.output;
        this.content = null;
        this.result = '';
    }

    detect(rules) {
        
        if (!this.input.mode || !this.input.source) {
            throw Error("Wrong input parameters. Input object requires mode and source keys.");
        } else if (!this.output.mode) {
            throw Error("Wrong output parameters. Output object requires mode key.");
        } else if ((this.output.mode == config.outputMode.FILE || this.output.mode == config.outputMode.STREAM) && !this.output.destination) {
            throw Error("Wrong output parameters. This mode of output object requires destination key.");
        }

        this._handleInput();

        if (!this.content) {
            this.result = 'No content.';
            return;
        }

        const $ = htmlParser.load(this.content);
        this.result = '';
        rules.forEach((element, index, array) => {
            if(!element.rule) {
                throw Error("There is no rule key in the item.");
            }
            let resText = '';
            let rule;
            switch (element.rule) {
                case config.ruleCategory.TAG_WITH_ATTRIBUTE:
                    if(!element.tag || !element.attr) {
                        throw Error("There is no tag or attr key in the item.");
                    }
                    rule = new TagWithAttrRule();
                    resText += rule.validate($, element.tag, element.attr).getError() || 'Valid';
                    break;
                case config.ruleCategory.TAG_LIMIT_COUNT:
                    if(!element.tag || !element.count) {
                        throw Error("There is no tag or count key in the item.");
                    }
                    rule = new TagLimitCountRule();
                    resText += rule.validate($, element.tag, element.count).getError() || 'Valid';
                    break;
                case config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE:
                    if(!element.tag) {
                        throw Error("There is no tag key in the item.");
                    }
                    rule = new ChildTagWithAttrRule();
                    resText += rule.validate($, element.parent, element.tag, element.attr, element.value).getError() || 'Valid';
                    break;
                default: 
                    break;
            }
            if (index !== array.length -1) {
                resText += '\n';
            }
            this.result += resText;
        });

        this._handleOutput();
    }

    _handleInput() {
        switch (this.input.mode) {
            case config.inputMode.FILE:
                this.content = await(fileHandler.read(this.input.source));
                break;
            case config.inputMode.STREAM:
                this.content = await(stream.read(this.input.source));
                break;
            default:
                break;
        }
    };

    _handleOutput() {
        switch (this.output.mode) {
            case config.outputMode.FILE:
                await(fileHandler.write(this.output.destination, this.result));
                break;
            case config.outputMode.STREAM:
                await(stream.write(this.output.destination, this.result));
                break;
            case config.outputMode.CONSOLE:
                console.log(this.result);
                break;    
            default:
                break;
        }
    }
}

module.exports = Detector;