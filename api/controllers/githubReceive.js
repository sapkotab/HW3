"use strict";

module.exports = {
    getGitHub:getGitHub
};

// needed to run this code here. command line didn't work for me
// following code need to run once and it will create key.js and store.js in controller

// var vault = require('avault').createVault(__dirname);
// var keyName = 'key1';
// vault.generateKey(keyName).then(
//     function (keyResponse) {
//         vault.store(keyName, '{"gitToken": "PutYourTokenHere"}', 'GitVault').then(
//             function (storeResponse) {
//                 console.log('Ok', storeResponse);
//             },
//             function (err) {
//                 console.log('Error', err);
//             });
//     },
//     function (err) {
//         console.log('Error', err);
//     });


function getGitHub(req,res) {


    var githubapi = require("github");

    var github = new githubapi({
        version: "3.0.0"
    });

    var vault = require('avault').createVault(__dirname);
    vault.get('GitVault', function (profileString) {
        if(!profileString){
            console.log('Error: required vault is not found');
        }else {
            var profile = JSON.parse(profileString);
            console.log(profile);
        }
        github.authenticate({
            type: "oauth",
            token: profile.gitToken
        });
    });


    var output = "";
    github.users.get({user: "sapkotab"}, function (err, data) {
        github.users.getFollowing({}, function (err, data2) {
            console.log("GOT ERR?", err);
            console.log("GOT RES?", data);
            res.json(data2)
        });
    });
    return output;
}
