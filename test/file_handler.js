'use strict';

global.__BASE__ = process.cwd() + '/';

const assert = require('assert');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const fileHandler = require('../lib/file_handler');

describe('File', function() {
    describe('#read file', function() {
        it('should read file test.txt without error', async(function() {
            const result = await(fileHandler.read(global.__BASE__ + 'test/test.txt'));
            assert.equal(result, "hello");
        }))

        it('should read with error for invalid path', async(function() {
            try {
                await(fileHandler.read('../static/error.txt'));
            } catch(err) {
                assert(err instanceof Error);
                assert.equal(err.code, 'ENOENT');
            }
        }))
    })
    describe('#write file', function() {
        it('should write file to out.txt without error', async(function() {
            const content = 'mocha_write_testing';
            const path = global.__BASE__ + 'test/out.txt';
            await(fileHandler.write(path, content));
            const result = await(fileHandler.read(path));
            assert.equal(result, content);
        }))

        it('should write file to error.txt with error for invalid path', async(function() {
            try {
                await(fileHandler.write('../static/error.txt', 'mocha_write_testing'));
            } catch(err) {
                assert(err instanceof Error);
                assert.equal(err.code, 'ENOENT');
            }
        }))
    })
});