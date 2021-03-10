const request = require('request');

function requestPromise(url, parse = true) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            // in addition to parsing the value, deal with possible errors
            if (error) return reject(error);
            try {
                resolve(parse ? JSON.parse(body) : body);
            } catch (e) {
                console.error(e);
                reject(e);
            }
        });
    });
}

module.exports.requestPromise = requestPromise