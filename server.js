const wa = require('@open-wa/wa-automate');
const User = require("./server/model/User");
const userUtils = require("./server/utils/userUtils");
const userResponse = require("./server/utils/userResponse");
const imageToSticker = require("./server/utils/imageToSticker");
const youtubeDownload = require("./server/utils/youtube/youtubeDownload");
const googleResponse = require("./server/utils/google/googleResponse");
const diaryHoroscope = require("./server/utils/horoscope/diaryHoroscope");
const { formatParams } = require('./server/utils/formatParams');

wa.create(
  {
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  }
).then(client => start(client));

function start(client){
  User.userSchema();
  client.onAnyMessage(async message => {
    const command = message.text.split(" ");
    
    switch (command[0]) {
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
      case "!kotzz-commands":
        await client.reply(message.chat.id, await userResponse.allCommands(), message.id);
        break;
      case "!kotzz-search":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await googleResponse.search(message, client, await formatParams(command))
        break;
      case "!kz-yt-mp3":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await youtubeDownload.downloadMp3FromYoutube(await youtubeDownload.formatQuery(command), message, client);
        break;
      case "!kz-yt-mp4":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await youtubeDownload.downloadMp4FromYoutube(await youtubeDownload.formatQuery(command), message, client); 
        break;
      case "!kz-horoscope":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await diaryHoroscope.diary(message, client, command[1]);
        break;
    }
    
  })
}
