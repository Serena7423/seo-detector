'use strict';

const fs = require('fs');

module.exports = {
    read: read,
    write: write
}

function read(filepath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filepath, 'utf8', function (err,data) {
            if (err) {
                reject(error);
            }
            resolve(data);
        });
    });
}

function write(filepath, data) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(filepath, data, function(err) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}