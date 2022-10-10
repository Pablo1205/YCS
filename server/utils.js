const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
require('dotenv').config();


const cypherText = (string) => {
    return new Promise((resolve, reject) => {
        resolve(CryptoJS.AES.encrypt(JSON.stringify(string), process.env.SECRET_CYPHER).toString());
    })
}

const decypherText = (string) => {
    return new Promise(async (resolve, reject) => {
        var bytes = CryptoJS.AES.decrypt(string, process.env.SECRET_CYPHER);
        var stringBytes = bytes.toString(CryptoJS.enc.Utf8);
        var newStr = stringBytes.replace('"', '');
        newStr = newStr.replace('"', '');
        resolve(newStr);
    })
    
}

const decodeToken = function (token) {
    if (token) {
        return jwt.decode(token);
    } else {
        return null
    }
};
module.exports = {
    decodeToken,
    cypherText,
    decypherText
}