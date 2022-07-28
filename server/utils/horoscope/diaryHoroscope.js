const Crawler = require("crawler");

async function diary(message, client, params){
    const crawler = new Crawler({
        maxConnections: 10,
        callback: (err, data, done) => {
            if(err){
                console.log(err);
                client.reply(message.chat.id, "Erro inesperado. ", message.id)
            }else{
                var $ = data.$;
                const title = $("title").first().text();
                const horoscope = $("p").first().text()
                client.reply(message.chat.id, `${title}\n\n${horoscope}`, message.id);
            }
            done();
        }
        
    })
    const signo = params.toLowerCase().replace(/[áã]/g, "a").replace(/[ó]/g, "o").replace(/[ê]/g, "e");
    crawler.queue(`https://www.terra.com.br/vida-e-estilo/horoscopo/signos/${signo}/`);

}



module.exports = {diary};