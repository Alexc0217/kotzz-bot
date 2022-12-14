const wa = require('@open-wa/wa-automate');
const User = require("./server/model/User");
const Copypasta = require("./server/model/Copypasta");
const userUtils = require("./server/utils/userUtils");
const userResponse = require("./server/utils/userResponse");
const copypastaUtils = require("./server/utils/copypasta/copypastaUtils");
const imageToSticker = require("./server/utils/imageToSticker");
const youtubeDownload = require("./server/utils/youtube/youtubeDownload");
const googleResponse = require("./server/utils/google/googleResponse");
const diaryHoroscope = require("./server/utils/horoscope/diaryHoroscope");
const options = require("./server/utils/options/options");
const raffle = require("./server/utils/raffle/raffle");
const { formatParams, formatParamsWithObj, formatCopypasta } = require('./server/utils/formatParams');

wa.create({
  sessionId: "KZ_BOTT",
  multiDevice: true, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
}).then(client => start(client));
  
function start(client){
  User.userSchema();
  Copypasta.copypastaSchema();
  client.onAnyMessage(async message => {
    const command = message.text.split(" ");
    
    switch (command[0]) {

      case "!oi":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await client.reply(message.chat.id, 'opa', message.id);
        break;
      case "!kz-stats":
        await client.reply(message.chat.id, await userResponse.stats(message), message.id);
        break;
      case "!kz-sticker":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await imageToSticker.sticker(message, client);
        break;
      case "!kz-rank":
        await client.reply(message.chat.id, await userResponse.rank(), message.id);
        break;
      case "!kz-help":
        await client.reply(message.chat.id, await userResponse.help(), message.id);
        break;
      case "!kz-commands":
        await client.reply(message.chat.id, await userResponse.allCommands(), message.id);
        break;
      case "!kz-search":
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
      case "!sortear":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await raffle.raffle(await formatParamsWithObj(command), client, message);
        break;
      case "!kz-copypasta":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        userResponse.copypasta();
        break;
      case "!kz-copypasta-new":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        const copypasta = {text: await formatCopypasta(command), name: command[1]}
        await copypastaUtils.createCopypasta(message, copypasta);
        break;
      case "!kz-copypasta-todas":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await copypastaUtils.getCopypasta(message, client);
        break;
      case "!kz-copypasta-buscar":
        userUtils.saveUser(message);
        userUtils.updateTotalUsed(message);
        await copypastaUtils.findCopypasta(message, client, command[1])
        break;
      case "!kz-options":
        const collector = client.createMessageCollector(message.chat.id, secondMessage => {secondMessage.chat.id === message.chat.id}, {
          time: 10 * 5,
          max: 3
        })
        collector.on("collected", msg => {
          console.log(msg);
        })
          
        
        //await options.test(message, client);
        break;
    }
    
  })
}
