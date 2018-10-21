'use strict';

module.exports = {
    read: read,
    write: write
}

function read(readableStream) {
    return new Promise(function (resolve, reject) {
        let data;
        
        readableStream.on('readable', function() {
            let chunk;
            while ((chunk=readableStream.read()) != null) {
                data += chunk;
            }
        });
        
        readableStream.on('end', function() {
            resolve(data);
        });
        
        readableStream.on('error', function(error) {
            reject(error);
        });
    });
}

function write(writableStream, data) {
    return new Promise(function (resolve, reject) {
        
        writableStream.write(data);
        writableStream.end;
        
        writableStream.on('finish', function(data) {
            resolve(data);
        });
        
        writableStream.on('error', function(error) {
            reject(error);
        });
    });
}