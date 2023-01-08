async function userSchema(){
    const db = require("../../database/db");
    const exist = await db.tableExists("users");
    if(exist){
        console.log(exist);
        return "table Users already exists.";
    }else{
        const conn = await db.connect();
        await conn.query('CREATE TABLE users(user_id int primary key auto_increment, whatsapp_id varchar(300) NOT NULL, name varchar(50) NOT NULL, total_used int default 0, user_type varchar(12) default "user");');
        return "table users created";
    }
}

async function findUserById(id){
    const db = require("../../database/db");
    const conn = await db.connect();
    const [user] = await conn.query('SELECT * FROM users WHERE whatsapp_id = ?', id);
    if(user.length != 0){
        return user;
    }else{
        return "user not find";
    }
}

async function userExists(id){
    const db = require("../../database/db");
    const conn = await db.connect();
    const [user] = await conn.query('SELECT * FROM users WHERE whatsapp_id = ?', id);
    if(user.length != 0){
        return true;
    }else{
        return false;
    }
}

module.exports = {userSchema, findUserById, userExists};