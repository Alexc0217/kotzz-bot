async function raffle(params, client, message){
    const randomIndex = Math.floor(Math.random() * params.length) + 1;
    var winner = "";
    params.forEach(async value => {
        if(value.id === randomIndex){
            winner = value.name;
        }
    })
    client.reply(message.chat.id, `Palavra sorteada: ${winner}`, message.id);
}


module.exports = {raffle};