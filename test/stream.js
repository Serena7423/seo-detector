'use strict';

global.__BASE__ = process.cwd() + '/';

const assert = require('assert');
const fs = require('fs');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const fileStream = require('../lib/stream');

const errorPath = '../static/error.txt';

describe('Stream', function() {
    describe('#read stream', function() { 
        it('should read stream without error', async(function() {
            const content = 'mocha_read_testing';
            const path = global.__BASE__ + 'test/test.txt';
            const stream = fs.createReadStream(path).setEncoding("utf8");
            
            const result = await(fileStream.read(stream));
            assert.equal(result, content);
        }))

        it('should read stream with error', async(function() {
            try {
                const stream = fs.createReadStream(errorPath).setEncoding("utf8");
                const result = await(fileStream.read(stream));
            } catch(err) {
                assert(err instanceof Error);
                assert.equal(err.code, 'ENOENT');
            }
        }))
    })
    
    describe('#write stream', function() {
        const content = 'mocha_write_testing';
        it('should write stream to outstream.txt without error', async(function() {
            const path = global.__BASE__ + 'test/outstream.txt'; 
            const outStream = fs.createWriteStream(path);
            await(fileStream.write(outStream, content));
            
            const inStream = fs.createReadStream(path).setEncoding("utf8");
            const result = await(fileStream.read(inStream));
            
            assert.equal(result, content);
        }))

        it('should write stream to error.txt with error for invalid path', async(function() {
            try {            
                const outStream = fs.createWriteStream(errorPath);
                await(fileStream.write(outStream, content));
            } catch(err) {
                assert(err instanceof Error);
                assert.equal(err.code, 'ENOENT');
            }
        }))
    })
});