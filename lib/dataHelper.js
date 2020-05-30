/*
 * this will allow a user to add remove or update
 *
 */

// build in module 
const fs = require('fs');
const path = require('path');

// custom module
const helper = require('./helper');

// storing data format
// user_name
//  - userId
//  - password
//  - emaildata
let dataHelper = {};

dataHelper.baseDir = path.join(__dirname + '/../.data/');

// add new data
dataHelper.create = function(dir, file, data, callback) {

    console.log(dataHelper.baseDir);
    console.log(path.join(__dirname + '/../.data/'));

    fs.open(dataHelper.baseDir+dir+'/'+file+'.json', 'wx', function (err, fd) {
        if (!err) {
            let stringData = JSON.stringify(data);
            fs.writeFile(fd, stringData, function(err) {
                if (!err) {
                    fs.close(fd, function (err) {
                        if (!err) {
                            callback(false)
                        } else {
                            callback(err);
                        }
                    });
                } else {
                    callback(err);
                }
            });
        } else {
            callback(err);
        }
    });
}

// read data
dataHelper.read = function (dir, file, callback) {
    fs.readFile(dataHelper.baseDir+dir+'/'+file+'.json', 'utf-8', function (err, data) {
        if (!err) {
            callback(false, data);
        } else {
            callback(err);
        }
    })
}

// remove data
dataHelper.deleteAll = function(dir, file, callback) {
    fs.unlink(dataHelper.baseDir+dir+'/'+file+'.json', function (err) {
        if (!err) {
            callback(false);
        } else {
            callback('Failed to delete', err);
        }
    });
}

// delete one entry
dataHelper.delete = function(dir, file, row, callback) {
    // read the file data
    // exclude one entry
    // save file
} 

// update existing data
dataHelper.update = function (dir, file, data, callback) {

}

module.exports = dataHelper;