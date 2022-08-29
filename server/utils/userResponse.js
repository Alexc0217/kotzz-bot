const userUtils = require("./userUtils");
const commands = [
    "!kz-sticker",
    "!kz-stats",
    "!kz-rank",
    "!kz-commands",
    "!kz-search",
    "!kz-yt-mp3",
    "!kz-yt-mp4",
    "!kz-horoscope",
    "!sortear",
    "!kz-help"
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
        '*|------ !kz-sticker ------|*\nComo usar: Mande uma imagem seguida do comando\n',
        '*|------ !kz-stats ------|*\nVeja quantas vezes você usou o bot\n',
        '*|------ !kz-rank ------|*\nVeja as pessoas que mais usaram o bot\n',
        '*|------ !kz-commands ------|*\nVeja a lista de comandos do Kotzz Bot\n',
        '*|------ !kz-search ------|*\nComo usar: digite o comando seguido de algo que você queira pesquisar\nEx: *!kz-search* como fazer café\n',
        '*|------ !kz-yt-mp3 ------|*\nBaixe um mp3 direto do youtube\nComo usar: digite o comando seguido de um link ou um titulo de um vídeo\nEx: *!kz-yt-mp3* Die for you - the weekend\n',
        "*|------ !kz-yt-mp4 ------|*\nBaixe um vídeo direto do youtube\nComo usar: digite o comando seguido de um link ou um titulo de um vídeo\nEx: *!kz-yt-mp4* Die for you - the weekend\n",
        "*|------ !kz-horoscope ------|*\nVeja seu horóscopo do dia\nComo usar: digite o comando seguido do seu signo\nEx: *!kz-horoscope* aquário\n",
        '*|------ !sortear ------|*\nSorteie uma lista de palavras\nComo usar: digite o comando seguido de diversas palavras\nEx: !sortear Alex Bruno Caique Duda Enéias\n',
        '*|------ !kz-help ------|*\n'
    ]

    var response = `Olá, sou o Bot do Kotzz!\n\nTenho diversos comandos para a sua comodidade.\n\n` 

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