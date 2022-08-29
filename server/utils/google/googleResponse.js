const google = require("google")

async function search(message, client, params){
    google.resultsPerPage = 25;
    google.lang = "pt-br";
    google.nextText = "pt-br"
    if(params === undefined || params === ""){
        await client.reply(message.chat.id, "Coloque algo para usar este comando, por exemplo: \n!kz-search como fazer um bolo de fubá", message.id);
    }else{
        google(params, async function(err, res){
            if(err) return console.log(err);
            await client.reply(message.chat.id, res.url, message.id);
        })
    }

}

module.exports = {search};