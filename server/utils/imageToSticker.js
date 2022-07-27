const mime = require('mime-types');
const {decryptMedia} = require('@open-wa/wa-automate')

async function sticker(message, client){
    if(message.mimetype){
      if(message.mimetype === "video/mp4"){
        const mediaData = await decryptMedia(message);
        const videoBase64 = `data:${message.mimetype};base64,${mediaData.toString(
            'base64'
        )}`;
        await client.sendMp4AsSticker(
            message.chat.id,
            videoBase64,
            message.id,
            {author: "Kotzz-Bot", pack: "Kotzz Pack", cropPosition: "center"}
          )
    }else{
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
          'base64'
        )}`;
        await client.sendImageAsStickerAsReply(
          message.chat.id,
          imageBase64,
          message.id,
          {author: "Kotzz-Bot", pack: "Kotzz Pack", cropPosition: "center"}
        )
      }
    }
      
}

module.exports = {sticker}