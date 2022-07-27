const userUtils = require("./userUtils");
const commands = [
    "!kotzz-sticker",
    "!kotzz-stats",
    "!kotzz-rank",
    "!kotzz-commands",
    "!kotzz-search",
    "!kz-yt-mp3",
    "!kz-yt-mp4",
    "!kotzz-help"
]
async function stats(message){
    const total_used = await userUtils.getTotalUsed(message);
    const response = "==== Kotzz Status ====\n" + "Você usou o bot " + total_used + " vezes."
    return response;
}

async function rank(){
    const users = await userUtils.getRank();
    var response = `==== Rank Kotzz-Bot ====\n`
    for(var i = 0; i < users.length; i++){
      response += `${i+1} - ${users[i].name} usou ${users[i].total_used} vezes.\n`
    }
    return response;
}

async function help(){
    const help = [
        '!kotzz-sticker (mande uma imagem com a legenda "!kotzz-sticker".)',
        "!kotzz-stats",
        "!kotzz-rank",
        "!kotzz-commands",
        "!kotzz-search (insira aqui o texto que deseja pesquisar.)",
        "!kz-yt-mp3 (insira aqui o link ou o título do vídeo do youtube.)",
        "!kz-yt-mp4 (insira aqui o link ou o título do vídeo do youtube.)",
        '!kotzz-help'
    ]

    var response = `==== Kotzz-Bot Help ====\n` 

    for(var i = 0; i < help.length; i++){
        response += `${help[i]}\n`
    }
    return response;
}

async function allCommands(){
    var response = `==== Kotzz-Bot Commands ====\n` 

    for(var i = 0; i < commands.length; i++){
        response += `${commands[i]}\n`
    }
    return response;
}

module.exports = {stats, rank, help, allCommands};