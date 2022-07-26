import { Client, Message } from "@open-wa/wa-automate";
import { decryptMedia } from "@open-wa/wa-automate";
import { buffer2webpbuffer } from "webp-converter";

async function convertWebp(message: Message, client: Client){
    if(message.mimetype === "video/mp4"){
        const mediaData = await decryptMedia(message);
        const videoWebp = buffer2webpbuffer(mediaData).then(async buffer => {
            await client.sendImageAsStickerAsReply(
                message.chat.id,
                    buffer,
                    message.id,
                    {author: "Kotzz-Bot", pack: "Kotzz Pack", cropPosition: "center"}
                )
        }).catch(err => {
            console.log(err);
        })
        
    }
}

module.exports = {convertWebp};