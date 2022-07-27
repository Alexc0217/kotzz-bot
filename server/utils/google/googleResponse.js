const google = require("google")

async function search(message, client, params){
    google.resultsPerPage = 10;
    google.lang = "pt-br";
    google.nextText = "pt-br"
    google(params, async function(err, res){
        if(err) return console.log(err);
        await client.reply(message.chat.id, res.url, message.id);
    })
}

module.exports = {search};