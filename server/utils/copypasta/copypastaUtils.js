const User = require('../../model/User');
const copypastaController = require("../../controller/copypasta_controller");

async function createCopypasta(message, copypasta){
  const [user] = await User.findUserById(message.sender.id);
  await copypastaController.create(user, copypasta);
}

async function getCopypasta(message, client){
  const copypastas = await copypastaController.findAll();
  var everyCopypastas = ""
  copypastas.map((cp) => {
    everyCopypastas = everyCopypastas + `ID: ${cp.copypasta_id}\nNome: ${cp.name}\n\n`
  })
  await client.reply(message.chat.id, everyCopypastas, message.id)
}

async function findCopypasta(message, client, id){
  const [copypasta] = await copypastaController.find(id);
  await client.reply(message.chat.id, copypasta.copypasta_text, message.id);
}

module.exports = {createCopypasta, getCopypasta, findCopypasta};