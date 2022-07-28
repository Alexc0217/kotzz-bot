const yts = require("yt-search");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const fs = require("fs");
const ytdl = require("ytdl-core")

async function downloadMp3FromYoutube(link, message, client){
    const youtubeSearch = await yts(link).then(result =>{
        console.log(result);
        const video = result.videos[0];
        try{
            var YD = new YoutubeMp3Downloader({
                "ffmpegPath": "./ffmpeg/bin/ffmpeg.exe",
                "outputPath": "./media/ytbmp3",
                "youtubeVideoQuality": "highestaudio",
                "queueParallelism": 2,
                "progressTimeout": 2000,
                "allowWebm": false  
            });
              YD.download(video.videoId)
              YD.on("finished", async (err, data) => {
                console.log(data);
                await client.sendAudio(message.chat.id, data.file, message.id);
                fs.unlinkSync(data.file);
              })
        }catch(err){
            console.log(err);
            client.reply(message.chat.id, "Erro inêsperado. Tente buscar pelo título ou aguarde correção.", message.id)
        }
        
      }).catch(err => {
        console.log(err)
      })
}

async function downloadMp4FromYoutube(params, message, client){
    const youtubeSearch = await yts(params).then( async result => {
        const video = result.videos[0];
        try{
            var title = video.title
            ytdl(video.url)
            .pipe(fs.createWriteStream(`./media/ytmp4/${video.title.substring(0, 20)}.mp4`))
            .on('close', (data) => {
                var vd = fs.readFileSync(`./media/ytmp4/${video.title.substring(0, 20)}.mp4`);
                const videoBase64 = `data:${message.mimetype};base64,${vd.toString(
                    'base64'
                )}`;
                client.sendFile(message.chat.id, videoBase64, `${video.title.substring(0, 20)}.mp4`, `Vídeo: ${title}\n duração: ${video.duration}`, message.id).then(() => {
                    fs.unlinkSync(`./media/ytmp4/${video.title.substring(0, 20)}.mp4`);
                })
            })
        }catch(err){
            client.reply(message.chat.id, "Erro inesperado. Aguarde correção. ");
            console.log(err);
        }
    }).catch(err => {
        console.log(err);
    })
}

async function formatQuery(command){
    var link = "";
    if(command.length === 2){
      var link = command[1];
    }else{
      for(var i = 1; i < command.length; i++){
        link += command[i] + " ";
      }
    }
    return link;
}

module.exports = {downloadMp3FromYoutube, downloadMp4FromYoutube, formatQuery}