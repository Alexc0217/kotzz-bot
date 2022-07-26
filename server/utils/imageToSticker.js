const mime = require('mime-types');
const {decryptMedia} = require('@open-wa/wa-automate')

async function sticker(message, client){
    if(message.mimetype){
      const filename = `${message.t}.${mime.extension(message.mimetype)}`
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

module.exports = {sticker}