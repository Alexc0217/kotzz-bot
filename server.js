const wa = require('@open-wa/wa-automate');
const db = require("./database/db");
const User = require("./server/model/User");
const userUtils = require("./server/utils/userUtils");
const userResponse = require("./server/utils/userResponse");
const imageToSticker = require("./server/utils/imageToSticker");
//const gifToSticker = require("./server/utils/gifToSticker");

wa.create().then(client => start(client));

function start(client){
  User.userSchema();
  client.onAnyMessage(async message => {
    console.log(message);
    //console.log("===========> " + message.from)
    //console.log("===========> " + message.content)

    const command = message.text;

    switch (command) {
      case "!oi":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await client.reply(message.chat.id, 'opa', message.id);
        break;
      case "!kotzz-stats":
        await client.reply(message.chat.id, await userResponse.stats(message), message.id);
        break;
      case "!kotzz-sticker":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await imageToSticker.sticker(message, client);
        break;
      case "!kotzz-rank":
        await client.reply(message.chat.id, await userResponse.rank(), message.id);
        break;
      case "!kotzz-help":
        await client.reply(message.chat.id, await userResponse.help(), message.id);
        break;
        /*
      case "!kotzz-sticker-gif":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await gifToSticker.gifToSticker(message, client);
        break;
        */
    }
    
  })
}
