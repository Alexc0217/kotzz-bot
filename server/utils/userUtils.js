const User = require('../model/User');
const db = require('../../database/db');
const user_controller = require("../controller/user_controller");

async function saveUser(message){
    if(await User.userExists(message.sender.id)){
        console.log("user exist.");
    }else{
        await user_controller.create({whatsapp_id: message.sender.id, name: message.sender.pushname})
        updateTotalUsed(message);
    }
}

async function updateTotalUsed(message){
    if(await User.userExists(message.sender.id)){
        user_controller.updateTotalUsed(message.sender.id);
    }else{
        console.log("User doesn't exist. ");
    }
}

async function getTotalUsed(message){
    if(await User.userExists(message.sender.id)){
        return user_controller.total_used(message.sender.id);
    }else{
        console.log("User doesn't exist. ");
    }
}

async function getRank(){
    if(user_controller.rank().length != 0){
        return user_controller.rank()
    }else{
        return "não há usuários."
    }
}

module.exports = {saveUser, updateTotalUsed, getTotalUsed, getRank};