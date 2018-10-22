'use strict';

const assert = require('assert');
const fs = require('fs');
const Detector = require('../lib/detector');
const config = require('../config');

describe('Detector input error', function () {

    it('should throw error due to lack of source key in input', function () {
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
            detector.detect([]);
        } catch(err) {
            assert.equal(err.message, 'Wrong input parameters. Input object requires mode and source keys.');
        }
    });    
    
    it('should throw error due to lack of mode key in input', function () {
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
            detector.detect([]);
        } catch(err) {
            assert.equal(err.message, 'Wrong input parameters. Input object requires mode and source keys.');
        }
    });
});

describe('Detector output error', function () {

    it('should throw error due to lack of mode key in output', function () {
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
            detector.detect([]);
        } catch(err) {
            assert.equal(err.message, 'Wrong output parameters. Output object requires mode key.');
        }
    });    
    
    it('should throw error due to lack of mode key in output', function () {
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
            detector.detect([]);
        } catch(err) {
            assert.equal(err.message, 'Wrong output parameters. This mode of output object requires destination key.');
        }
    });
});

