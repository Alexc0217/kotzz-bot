const mime = require('mime-types');
const {decryptMedia} = require('@open-wa/wa-automate');
const webp = require("webp-converter");
const convert = require("./convert");

async function gifToSticker(message, client){
    
    if(message.mimetype){
        convert.default(message, client);
    }
}

module.exports = {gifToSticker};