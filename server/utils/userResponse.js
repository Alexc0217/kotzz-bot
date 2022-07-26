const userUtils = require("./userUtils");

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
    const commands = [
        "!kotzz-sticker",
        "!kotzz-stats",
        "!kotzz-rank",
        "!kotzz-help"
    ]

    var response = `==== Kotzz-Bot Comandos ====\n` 

    for(var i = 0; i < commands.length; i++){
        response += `${commands[i]}\n`
    }
    return response;
}

module.exports = {stats, rank, help};